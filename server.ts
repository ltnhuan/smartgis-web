import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'super-secret-key-123456';
const DATA_FILE = path.join(process.cwd(), 'cms-data.json');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Default data structure
const defaultData = {
  hero: {
    title: "Hệ thống Thông tin Địa lý Thông minh",
    subtitle: "Giải pháp toàn diện cho quản lý, phân tích và chia sẻ dữ liệu không gian",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
  },
  features: [
    { 
      id: "1",
      icon: "Building", 
      title: "Quy hoạch đô thị", 
      desc: "Quản lý, giám sát quy hoạch xây dựng. Khai thác CSDL trên bản đồ số, hỗ trợ cấp phép xây dựng.",
      image: "https://images.unsplash.com/photo-1614511113619-1582e05f6392?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "2",
      icon: "Leaf", 
      title: "Nông nghiệp", 
      desc: "Kiểm soát hiểm họa, mô hình phân tích đất/mưa, canh tác chính xác, dự đoán sản lượng.",
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "3",
      icon: "Globe", 
      title: "Tài nguyên & Môi trường", 
      desc: "Quản lý tài nguyên, đánh giá sự cố môi trường, hoạch định chính sách.",
      image: "https://images.unsplash.com/photo-1582653291997-059f5f4780f2?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "4",
      icon: "CloudRain", 
      title: "Khí tượng thủy văn", 
      desc: "Theo dõi và phân tích dữ liệu thời tiết, thủy văn theo không gian.",
      image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "5",
      icon: "Car", 
      title: "Giao thông vận tải", 
      desc: "Quản lý hạ tầng giao thông, phân tích luồng tuyến và điều phối.",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "6",
      icon: "Landmark", 
      title: "Chính quyền địa phương", 
      desc: "Tích hợp dịch vụ công, minh bạch thông tin quy hoạch cho người dân.",
      image: "https://images.unsplash.com/photo-1526778548025-fa2fbf8b1c0b?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "7",
      icon: "HeartPulse", 
      title: "Y tế", 
      desc: "Bản đồ cơ sở y tế, phân tích dịch tễ học theo khu vực.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: "8",
      icon: "GraduationCap", 
      title: "Giáo dục", 
      desc: "Quản lý mạng lưới trường học, thông tin tuyển sinh theo tuyến.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    }
  ],
  locations: [
    { id: "1", name: "Hà Nội", lat: 21.0285, lng: 105.8542 },
    { id: "2", name: "Hồ Chí Minh", lat: 10.8231, lng: 106.6297 },
    { id: "3", name: "Đà Nẵng", lat: 16.0471, lng: 108.2068 }
  ]
};

// Helper to read data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

// Helper to write data
async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Middleware to verify admin token
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.adminToken || req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// API Routes
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === '123456') {
    const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.cookie('adminToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('adminToken', { httpOnly: true, secure: true, sameSite: 'none' });
  res.json({ success: true });
});

app.get('/api/check-auth', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

app.get('/api/data', async (req, res) => {
  const data = await readData();
  res.json(data);
});

app.put('/api/data', authenticateToken, async (req, res) => {
  try {
    await writeData(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
