import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { 
  Map, Globe, Layers, Search, FileText, Users, BarChart3, 
  MapPin, Mail, Building, Leaf, CloudRain, Landmark, 
  HeartPulse, Car, CheckCircle2, Menu, X, UploadCloud, 
  Eye, Server, GraduationCap, Smartphone, Apple, Play
} from 'lucide-react';
import Chatbot from './components/Chatbot';

// Helper to render dynamic icons
const renderIcon = (iconName: string, className: string) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Map;
  return <IconComponent className={className} />;
};

const Navbar = ({ data }: { data?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const siteName = data?.settings?.siteName || "SmartGIS";

  const links = [
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Tính năng', href: '#features' },
    { name: 'Ứng dụng', href: '#applications' },
    { name: 'Bài viết', href: '#posts' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-2xl font-bold text-emerald-800">{siteName}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors">
              Nhận tư vấn
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-emerald-600 font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ data }: { data?: any }) => {
  const heroData = data?.hero || {
    title: "Bản Đồ Thông Minh \n SmartGIS",
    subtitle: "Giải pháp thông minh ứng dụng công nghệ GIS. Nơi cung cấp các dịch vụ bản đồ số, giúp người dùng kết nối dữ liệu thuộc tính với vị trí địa lý một cách trực quan và hiệu quả.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 whitespace-pre-line">
              {heroData.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#features" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Khám phá tính năng
              </a>
              <a href="#contact" className="bg-white text-emerald-600 border border-emerald-200 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition-colors">
                Liên hệ tư vấn
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img src={heroData.image} alt="Giao diện hệ thống thông tin địa lý SmartGIS" className="rounded-2xl shadow-2xl border-4 border-white" referrerPolicy="no-referrer" />
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Dữ liệu</p>
                <p className="font-bold text-gray-900">Không gian 3D</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = ({ data }: { data?: any }) => {
  const basics = [
    { icon: <Map className="h-6 w-6" />, title: "Tạo & Nhập dữ liệu", desc: "Tạo hoặc nhập dữ liệu không gian và địa lý dễ dàng." },
    { icon: <Layers className="h-6 w-6" />, title: "Tổ chức & Quản lý", desc: "Tổ chức và quản lý dữ liệu không gian trên server." },
    { icon: <Eye className="h-6 w-6" />, title: "Trực quan hóa", desc: "Hiển thị dữ liệu trực quan trên nền tảng bản đồ số." },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Phân tích dữ liệu", desc: "Công cụ phân tích dữ liệu không gian mạnh mẽ." },
  ];

  const team = data?.team || [
    { name: "Nguyễn Văn A", role: "Giám đốc điều hành", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { name: "Trần Thị B", role: "Trưởng phòng Kỹ thuật", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    { name: "Lê Văn C", role: "Chuyên gia GIS", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
    { name: "Phạm Thị D", role: "Quản lý Dự án", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Về Hệ Thống SmartGIS</h2>
          <p className="text-gray-600 text-lg">
            Được xây dựng dựa trên nền tảng Java, SmartGIS cung cấp cho người dùng một giao diện web hiện đại để quản lý hệ thống dữ liệu không gian, kết nối dữ liệu thuộc tính với vị trí địa lý.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Đội Ngũ Cốt Lõi</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-50 shadow-sm">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <p className="text-emerald-600 text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative h-[300px] md:h-[400px] lg:h-[500px]"
        >
          <img 
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80" 
            alt="Bản đồ địa hình và quy hoạch không gian đô thị - Giải pháp SmartGIS" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Trực quan hóa dữ liệu không gian</h3>
              <p className="text-gray-200 md:text-lg max-w-2xl">Quản lý, phân tích và khai thác dữ liệu trên nền tảng bản đồ số chuyên nghiệp, giúp tối ưu hóa quá trình ra quyết định.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {basics.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-2xl hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <UploadCloud className="h-6 w-6" />, title: "Upload & Quản lý file", desc: "Không giới hạn dung lượng và số lượt upload, không tốn phí lưu trữ trung gian, bảo mật cao." },
    { icon: <FileText className="h-6 w-6" />, title: "Quản lý bài viết", desc: "Tạo mới thông tin bài viết (quy hoạch) nhanh chóng, dễ dàng." },
    { icon: <Search className="h-6 w-6" />, title: "Tra cứu thông minh", desc: "Hiển thị dựa trên khoảng cách, góc nhìn trực quan hơn trong không gian." },
    { icon: <MapPin className="h-6 w-6" />, title: "Đọc dữ liệu chính xác", desc: "Đọc thông tin vị trí qua mã màu/ký tự không yêu cầu chuyên môn." },
    { icon: <Users className="h-6 w-6" />, title: "Phân quyền dữ liệu", desc: "Phân quyền phối hợp các ngành theo yêu cầu, quản lý người dùng chặt chẽ." },
    { icon: <Server className="h-6 w-6" />, title: "Tích hợp dịch vụ công", desc: "Phát triển chức năng tương tác trên nền tảng với người dân." },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tính Năng & Lợi Ích Nổi Bật</h2>
            <p className="text-gray-600 mb-8">
              Mọi thứ xảy ra ở một vị trí cụ thể đều yêu cầu lập luận và phân tích không gian. SmartGIS mang đến bộ công cụ toàn diện để giải quyết các vấn đề "địa lý" của bạn.
            </p>
            <ul className="space-y-3 mb-10">
              {['Dễ dàng tra cứu lịch sử bản đồ', 'Lưu & tra cứu thông tin bản đồ', 'Đọc các lớp dữ liệu bản đồ', 'Thống kê chi tiết'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" 
                alt="Mạng lưới kết nối dữ liệu không gian và quy hoạch đô thị thông minh tại Việt Nam" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply"></div>
            </motion.div>
          </div>
          <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className="text-emerald-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Applications = ({ data }: { data?: any }) => {
  const apps = data?.features || [];

  return (
    <section id="applications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ứng Dụng Đa Ngành</h2>
          <p className="text-gray-600 text-lg">
            SmartGIS được thiết kế linh hoạt để phục vụ đa dạng các lĩnh vực, từ quản lý nhà nước đến phát triển kinh tế xã hội.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-2xl bg-gray-50 hover:bg-emerald-600 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                <img 
                  src={app.image} 
                  alt={`Ứng dụng ${app.title} - Bản đồ số SmartGIS`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-emerald-600 group-hover:text-white mb-4 transition-colors">
                  {renderIcon(app.icon, "h-8 w-8")}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">{app.title}</h3>
                <p className="text-gray-600 group-hover:text-emerald-50 text-sm transition-colors">{app.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppShowcase = () => {
  return (
    <section className="py-20 bg-emerald-600 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-emerald-700 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-50 text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                <span>SmartGIS Mobile App</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Tra cứu thông tin bản đồ số <br/>và quy hoạch mọi nơi
              </h2>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed max-w-xl">
                Ứng dụng SmartGIS Mobile giúp bạn dễ dàng tra cứu thông tin quy hoạch, xem bản đồ địa chính và nhận thông báo cập nhật mới nhất ngay trên điện thoại di động của mình.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Định vị GPS chính xác', 'Xem bản đồ offline', 'Cảnh báo thay đổi quy hoạch', 'Tương tác trực tiếp trên bản đồ'].map((item, i) => (
                  <li key={i} className="flex items-center text-emerald-50 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-xl">
                  <Apple className="h-8 w-8" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300">Download on the</div>
                    <div className="text-lg font-semibold leading-none">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-xl">
                  <Play className="h-8 w-8" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300">GET IT ON</div>
                    <div className="text-lg font-semibold leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative flex justify-center mt-10 md:mt-0">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10"
            >
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
                  <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Ứng dụng di động SmartGIS - Tra cứu thông tin bản đồ số và quy hoạch mọi nơi" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ data }: { data?: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Thiết kế - Khởi tạo",
    "Phần mềm tra cứu",
    "Chuyển giao License",
    "Câu hỏi thường gặp"
  ];

  const faq = data?.faq || [
    {
      question: "SmartGIS có hỗ trợ tích hợp với các hệ thống ERP hiện có không?",
      answer: "Có, SmartGIS cung cấp API mở và các công cụ tích hợp linh hoạt, cho phép kết nối dễ dàng với các hệ thống ERP, CRM và các phần mềm quản lý khác của doanh nghiệp."
    },
    {
      question: "Dữ liệu của tôi có được bảo mật an toàn không?",
      answer: "Bảo mật dữ liệu là ưu tiên hàng đầu của chúng tôi. SmartGIS áp dụng các tiêu chuẩn bảo mật quốc tế, mã hóa dữ liệu đầu cuối và hệ thống phân quyền truy cập chặt chẽ."
    },
    {
      question: "Thời gian triển khai hệ thống mất bao lâu?",
      answer: "Thời gian triển khai phụ thuộc vào quy mô và yêu cầu cụ thể của từng dự án. Thông thường, một dự án cơ bản có thể triển khai trong vòng 2-4 tuần."
    },
    {
      question: "Có hỗ trợ đào tạo sử dụng sau khi triển khai không?",
      answer: "Chắc chắn rồi. Chúng tôi cung cấp các khóa đào tạo chuyên sâu cho người dùng cuối và quản trị viên hệ thống, kèm theo tài liệu hướng dẫn chi tiết."
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bảng Giá Dịch Vụ</h2>
          <p className="text-gray-600 text-lg">
            Chi phí minh bạch, linh hoạt theo nhu cầu sử dụng của tổ chức và doanh nghiệp.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Table 1 */}
            {activeTab === 0 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-emerald-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Phí thiết kế - khởi tạo</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 font-semibold text-gray-700">Dữ liệu</th>
                        <th className="p-4 font-semibold text-gray-700">Loại dữ liệu</th>
                        <th className="p-4 font-semibold text-gray-700">Đơn vị tính</th>
                        <th className="p-4 font-semibold text-gray-700">Chi phí khởi tạo (VNĐ)</th>
                        <th className="p-4 font-semibold text-gray-700">Chi phí cập nhật (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900" rowSpan={2}>Đối tượng</td>
                        <td className="p-4 text-gray-600">Icon, hình ảnh</td>
                        <td className="p-4 text-gray-600">Đối tượng</td>
                        <td className="p-4 text-emerald-600 font-medium">Liên hệ</td>
                        <td className="p-4 text-emerald-600 font-medium">Liên hệ</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-gray-600">Lớp nền dữ liệu</td>
                        <td className="p-4 text-gray-600">Đối tượng</td>
                        <td className="p-4 text-emerald-600 font-medium">Liên hệ</td>
                        <td className="p-4 text-emerald-600 font-medium">Liên hệ</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">Dữ liệu đối tượng</td>
                        <td className="p-4 text-gray-600">-</td>
                        <td className="p-4 text-gray-600">Trường dữ liệu</td>
                        <td className="p-4 text-emerald-600 font-medium">Liên hệ</td>
                        <td className="p-4 text-gray-400 font-medium">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table 2 */}
            {activeTab === 1 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-emerald-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Phần mềm ứng dụng phục vụ tra cứu thông tin</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 font-semibold text-gray-700">Dịch vụ</th>
                        <th className="p-4 font-semibold text-gray-700 text-center">Số tháng sử dụng</th>
                        <th className="p-4 font-semibold text-gray-700 text-center">ĐVT</th>
                        <th className="p-4 font-semibold text-gray-700 text-right">Giá bán/tháng (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { months: 12, price: "Liên hệ" },
                        { months: 36, price: "Liên hệ" },
                        { months: 48, price: "Liên hệ" },
                        { months: 60, price: "Liên hệ" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          {i === 0 && (
                            <td className="p-4 font-medium text-gray-900 align-top" rowSpan={4}>
                              Phần mềm ứng dụng phục vụ tra cứu thông tin trên nền tảng website
                            </td>
                          )}
                          <td className="p-4 text-gray-600 text-center">{row.months}</td>
                          <td className="p-4 text-gray-600 text-center">HĐ</td>
                          <td className="p-4 text-emerald-600 font-medium text-right">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-emerald-50 text-sm text-emerald-800 font-medium border-t border-emerald-100 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  ** Nếu kèm App ứng dụng di động thì nhân lên 1.5 so với giá trên.
                </div>
              </div>
            )}

            {/* Table 3 */}
            {activeTab === 2 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-emerald-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Chuyển giao theo license 1 máy chủ</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 font-semibold text-gray-700">Dịch vụ</th>
                        <th className="p-4 font-semibold text-gray-700 text-center">ĐVT</th>
                        <th className="p-4 font-semibold text-gray-700 text-right">Giá bán khách hàng (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">
                          Phần mềm ứng dụng phục vụ tra cứu thông tin trên nền SmartGIS bao gồm nền tảng website, Geoserver, và App di động
                        </td>
                        <td className="p-4 text-gray-600 text-center">HĐ</td>
                        <td className="p-4 text-emerald-600 font-bold text-right text-lg">Liên hệ</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">Bảo trì</td>
                        <td className="p-4 text-gray-600 text-center">HĐ</td>
                        <td className="p-4 text-emerald-600 font-medium text-right">Liên hệ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-gray-50 text-sm text-gray-500 italic border-t border-gray-200">
                  ** Các phí trên không bao gồm máy chủ.
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 3 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Câu hỏi thường gặp (FAQ)</h3>
                <div className="space-y-6">
                  {faq.map((item: any, i: number) => (
                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <h4 className="text-lg font-semibold text-emerald-700 mb-2 flex items-start gap-2">
                        <span className="bg-emerald-100 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">Q</span>
                        {item.question}
                      </h4>
                      <p className="text-gray-600 pl-8 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Posts = ({ data }: { data?: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = data?.posts?.filter((p: any) => p.status === 'published') || [];

  const filteredPosts = posts.filter((post: any) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term)
    );
  });

  if (posts.length === 0) return null;

  return (
    <section id="posts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tin Tức & Bài Viết</h2>
          <p className="text-gray-600 text-lg mb-8">
            Cập nhật những thông tin mới nhất về công nghệ GIS và các hoạt động của chúng tôi.
          </p>
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LucideIcons.Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md"
            />
          </div>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any, index: number) => (
              <motion.div 
                key={post.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-emerald-600 font-medium mb-2">{new Date(post.date).toLocaleDateString('vi-VN')}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 self-start">
                    Đọc tiếp <LucideIcons.ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào phù hợp với "{searchTerm}".</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = ({ data }: { data?: any }) => {
  const settings = data?.settings || {};
  
  return (
    <footer id="contact" className="bg-emerald-900 text-emerald-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-2xl font-bold text-white">{settings.siteName || "SmartGIS"}</span>
            </div>
            <p className="text-emerald-200 mb-6">
              {settings.siteDescription || "Bản đồ thông minh - Giải pháp quản lý dữ liệu không gian toàn diện cho doanh nghiệp và tổ chức."}
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Liên Hệ</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                  <span>{settings.address || "MobiFone Vĩnh Long & Công ty CP Lera Group"}</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <a href={`mailto:${settings.contactEmail || "Info@smartgis.vn"}`} className="hover:text-white transition-colors">{settings.contactEmail || "Info@smartgis.vn"}</a>
                </li>
                <li className="flex items-center">
                  <LucideIcons.Phone className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <a href={`tel:${settings.contactPhone || "0123456789"}`} className="hover:text-white transition-colors">{settings.contactPhone || "0123 456 789"}</a>
                </li>
                <li className="flex items-center">
                  <Globe className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <a href="http://www.smartgis.vn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.smartgis.vn</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quét mã QR</h4>
              <div className="bg-white p-2 rounded-lg inline-block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://www.smartgis.vn" alt="Mã QR truy cập website SmartGIS - Nền tảng bản đồ số và quy hoạch" className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-emerald-800 mt-12 pt-8 text-center text-emerald-400 text-sm">
          &copy; {new Date().getFullYear()} SmartGIS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Locations = ({ data }: { data?: any }) => {
  const locations = data?.locations || [];

  if (locations.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mạng Lưới Vị Trí</h2>
          <p className="text-gray-600 text-lg">
            Các điểm triển khai hệ thống SmartGIS trên toàn quốc.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((loc: any, index: number) => (
            <motion.div 
              key={loc.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4"
            >
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{loc.name}</h3>
                <p className="text-gray-500 text-sm">Vĩ độ: {loc.lat}</p>
                <p className="text-gray-500 text-sm">Kinh độ: {loc.lng}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-200 selection:text-emerald-900 scroll-smooth">
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Features />
        <Applications data={data} />
        <Locations data={data} />
        <AppShowcase />
        <Posts data={data} />
        <Pricing data={data} />
      </main>
      <Footer data={data} />
      <Chatbot />
    </div>
  );
}
