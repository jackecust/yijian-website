from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
import aiosqlite
import os

app = FastAPI(
    title="一简科创 API",
    description="一简科创官网后端接口",
    version="1.0.0"
)

# CORS 配置 - 允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://10.12.10.5:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据库文件路径
DB_PATH = os.path.join(os.path.dirname(__file__), "contacts.db")


# 数据模型
class ContactForm(BaseModel):
    name: str
    phone: str
    grade: str

    @validator('name')
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError('姓名不能为空')
        if len(v.strip()) < 2:
            raise ValueError('姓名至少2个字符')
        return v.strip()

    @validator('phone')
    def validate_phone(cls, v):
        if not v or not v.strip():
            raise ValueError('手机号不能为空')
        phone = v.strip()
        # 简单的中国手机号验证
        if not phone.startswith('1') or len(phone) != 11 or not phone.isdigit():
            raise ValueError('手机号格式不正确')
        return phone

    @validator('grade')
    def validate_grade(cls, v):
        if not v or not v.strip():
            raise ValueError('年级不能为空')
        return v.strip()


class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
    grade: str
    created_at: str


# 初始化数据库
async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                grade TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'pending'
            )
        """)
        await db.commit()


# 启动时初始化数据库
@app.on_event("startup")
async def startup():
    await init_db()


# 健康检查
@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "一简科创 API 运行中",
        "timestamp": datetime.now().isoformat()
    }


# 获取所有咨询记录（需要认证）
@app.get("/api/contacts", response_model=list[ContactResponse])
async def get_contacts():
    """获取所有咨询记录"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT id, name, phone, grade, created_at FROM contacts ORDER BY created_at DESC"
        )
        rows = await cursor.fetchall()
        return [
            ContactResponse(
                id=row["id"],
                name=row["name"],
                phone=row["phone"],
                grade=row["grade"],
                created_at=row["created_at"]
            )
            for row in rows
        ]


# 提交咨询表单
@app.post("/api/contact")
async def submit_contact(contact: ContactForm):
    """提交咨询表单"""
    try:
        async with aiosqlite.connect(DB_PATH) as db:
            cursor = await db.execute(
                """
                INSERT INTO contacts (name, phone, grade, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (contact.name, contact.phone, contact.grade, datetime.now().isoformat())
            )
            await db.commit()

            # 返回创建的记录
            last_id = cursor.lastrowid

        return {
            "success": True,
            "message": "提交成功",
            "data": {
                "id": last_id,
                "name": contact.name,
                "phone": contact.phone,
                "grade": contact.grade
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器错误: {str(e)}")


# 获取统计信息
@app.get("/api/stats")
async def get_stats():
    """获取统计信息"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM contacts")
        total = (await cursor.fetchone())[0]

        cursor = await db.execute("""
            SELECT
                DATE(created_at) as date,
                COUNT(*) as count
            FROM contacts
            GROUP BY DATE(created_at)
            ORDER BY date DESC
            LIMIT 7
        """)
        recent = await cursor.fetchall()

    return {
        "total_contacts": total,
        "recent_7_days": [
            {"date": row[0], "count": row[1]} for row in recent
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
