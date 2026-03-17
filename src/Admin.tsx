import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, Edit2, LogOut, MapPin, Image as ImageIcon, Type, LayoutDashboard, Settings, FileText, Users, BarChart3 } from 'lucide-react';
import ImageGeneratorModal from './components/ImageGeneratorModal';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageTarget, setImageTarget] = useState<{type: string, index: number} | null>(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert('Sai mật khẩu!');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setData(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Lưu thành công!');
      } else {
        alert('Lưu thất bại!');
      }
    } catch (error) {
      alert('Lỗi khi lưu dữ liệu!');
    }
    setSaving(false);
  };

  const updateHero = (field: string, value: string) => {
    setData({ ...data, hero: { ...data.hero, [field]: value } });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };

  const addFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      icon: "Map",
      title: "Tính năng mới",
      desc: "Mô tả tính năng mới",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
    };
    setData({ ...data, features: [...data.features, newFeature] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...data.features];
    newFeatures.splice(index, 1);
    setData({ ...data, features: newFeatures });
  };

  const updateLocation = (index: number, field: string, value: string | number) => {
    const newLocations = [...data.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setData({ ...data, locations: newLocations });
  };

  const addLocation = () => {
    const newLocation = {
      id: Date.now().toString(),
      name: "Địa điểm mới",
      lat: 21.0,
      lng: 105.0
    };
    setData({ ...data, locations: [...data.locations, newLocation] });
  };

  const removeLocation = (index: number) => {
    const newLocations = [...data.locations];
    newLocations.splice(index, 1);
    setData({ ...data, locations: newLocations });
  };

  const updateSetting = (field: string, value: string) => {
    setData({ ...data, settings: { ...data.settings, [field]: value } });
  };

  const updatePost = (index: number, field: string, value: string) => {
    const newPosts = [...data.posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    setData({ ...data, posts: newPosts });
  };

  const addPost = () => {
    const newPost = {
      id: Date.now().toString(),
      title: "Bài viết mới",
      excerpt: "Mô tả ngắn...",
      content: "Nội dung bài viết...",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString().split('T')[0],
      status: "draft"
    };
    setData({ ...data, posts: [...(data.posts || []), newPost] });
  };

  const removePost = (index: number) => {
    const newPosts = [...data.posts];
    newPosts.splice(index, 1);
    setData({ ...data, posts: newPosts });
  };

  const updateTeam = (index: number, field: string, value: string) => {
    const newTeam = [...(data.team || [])];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setData({ ...data, team: newTeam });
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "Tên thành viên",
      role: "Chức vụ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    };
    setData({ ...data, team: [...(data.team || []), newMember] });
  };

  const removeTeamMember = (index: number) => {
    const newTeam = [...(data.team || [])];
    newTeam.splice(index, 1);
    setData({ ...data, team: newTeam });
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaq = [...(data.faq || [])];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setData({ ...data, faq: newFaq });
  };

  const addFaq = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "Câu hỏi mới?",
      answer: "Câu trả lời..."
    };
    setData({ ...data, faq: [...(data.faq || []), newQuestion] });
  };

  const removeFaq = (index: number) => {
    const newFaq = [...(data.faq || [])];
    newFaq.splice(index, 1);
    setData({ ...data, faq: newFaq });
  };

  const openImageModal = (type: string, index: number, title: string) => {
    setImageTarget({ type, index });
    setImagePrompt(`Một hình ảnh minh họa cho: ${title}`);
    setIsImageModalOpen(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (!imageTarget) return;
    
    if (imageTarget.type === 'post') {
      updatePost(imageTarget.index, 'image', imageUrl);
    } else if (imageTarget.type === 'team') {
      updateTeam(imageTarget.index, 'image', imageUrl);
    } else if (imageTarget.type === 'feature') {
      updateFeature(imageTarget.index, 'image', imageUrl);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập Admin
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <LayoutDashboard className="h-6 w-6 text-emerald-600 mr-2" />
          <span className="text-lg font-bold text-gray-800">SmartGIS CMS</span>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" /> Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'posts' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText className="h-5 w-5 mr-3" /> Bài viết
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'team' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="h-5 w-5 mr-3" /> Đội ngũ
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'faq' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText className="h-5 w-5 mr-3" /> FAQ
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'hero' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Type className="h-5 w-5 mr-3" /> Nội dung chính
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'features' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ImageIcon className="h-5 w-5 mr-3" /> Các lĩnh vực
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'locations' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MapPin className="h-5 w-5 mr-3" /> Vị trí bản đồ
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings className="h-5 w-5 mr-3" /> Cài đặt
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3" /> Đăng xuất
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-50 rounded-md"
          >
            Xem trang web
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý nội dung</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>

          {data && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Tổng quan hệ thống</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-emerald-600 mb-1">Tổng số bài viết</p>
                          <p className="text-3xl font-bold text-emerald-900">{data.posts?.length || 0}</p>
                        </div>
                        <div className="bg-emerald-200 p-3 rounded-lg text-emerald-700">
                          <FileText className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 mb-1">Lĩnh vực ứng dụng</p>
                          <p className="text-3xl font-bold text-blue-900">{data.features?.length || 0}</p>
                        </div>
                        <div className="bg-blue-200 p-3 rounded-lg text-blue-700">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600 mb-1">Vị trí bản đồ</p>
                          <p className="text-3xl font-bold text-purple-900">{data.locations?.length || 0}</p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-lg text-purple-700">
                          <MapPin className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-600 mb-1">Lượt truy cập (Demo)</p>
                          <p className="text-3xl font-bold text-orange-900">1,248</p>
                        </div>
                        <div className="bg-orange-200 p-3 rounded-lg text-orange-700">
                          <BarChart3 className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-medium text-gray-900">Quản lý bài viết</h2>
                    <button onClick={addPost} className="flex items-center text-sm text-emerald-600 hover:text-emerald-700">
                      <Plus className="h-4 w-4 mr-1" /> Viết bài mới
                    </button>
                  </div>
                  <div className="space-y-8">
                    {(data.posts || []).map((post: any, index: number) => (
                      <div key={post.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                        <button
                          onClick={() => removePost(index)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết</label>
                            <input
                              type="text"
                              value={post.title}
                              onChange={(e) => updatePost(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
                            <input
                              type="date"
                              value={post.date}
                              onChange={(e) => updatePost(index, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                            <select
                              value={post.status}
                              onChange={(e) => updatePost(index, 'status', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="published">Đã xuất bản</option>
                              <option value="draft">Bản nháp</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Excerpt)</label>
                            <textarea
                              value={post.excerpt}
                              onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={2}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết</label>
                            <textarea
                              value={post.content}
                              onChange={(e) => updatePost(index, 'content', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={6}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-sm font-medium text-gray-700">URL Ảnh đại diện</label>
                              <button
                                onClick={() => openImageModal('post', index, post.title)}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                              >
                                <ImageIcon className="w-3 h-3" /> Tạo ảnh AI
                              </button>
                            </div>
                            <input
                              type="text"
                              value={post.image}
                              onChange={(e) => updatePost(index, 'image', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                            />
                            {post.image && <img src={post.image} alt="Preview" className="h-32 rounded-md object-cover" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-medium text-gray-900">Quản lý Đội ngũ</h2>
                    <button
                      onClick={addTeamMember}
                      className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm thành viên
                    </button>
                  </div>
                  <div className="space-y-6">
                    {(data.team || []).map((member: any, index: number) => (
                      <div key={member.id || index} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên thành viên</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateTeam(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ</label>
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => updateTeam(index, 'role', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-sm font-medium text-gray-700">URL Ảnh đại diện</label>
                              <button
                                onClick={() => openImageModal('team', index, member.name)}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                              >
                                <ImageIcon className="w-3 h-3" /> Tạo ảnh AI
                              </button>
                            </div>
                            <input
                              type="text"
                              value={member.image}
                              onChange={(e) => updateTeam(index, 'image', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                            />
                            {member.image && <img src={member.image} alt="Preview" className="h-24 w-24 rounded-full object-cover" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-medium text-gray-900">Quản lý FAQ</h2>
                    <button
                      onClick={addFaq}
                      className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm câu hỏi
                    </button>
                  </div>
                  <div className="space-y-6">
                    {(data.faq || []).map((item: any, index: number) => (
                      <div key={item.id || index} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                        <button
                          onClick={() => removeFaq(index)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="grid grid-cols-1 gap-4 pr-10">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi</label>
                            <input
                              type="text"
                              value={item.question}
                              onChange={(e) => updateFaq(index, 'question', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Câu trả lời</label>
                            <textarea
                              value={item.answer}
                              onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Cài đặt chung</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên trang web</label>
                      <input
                        type="text"
                        value={data.settings?.siteName || ''}
                        onChange={(e) => updateSetting('siteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả trang web</label>
                      <textarea
                        value={data.settings?.siteDescription || ''}
                        onChange={(e) => updateSetting('siteDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email liên hệ</label>
                      <input
                        type="email"
                        value={data.settings?.contactEmail || ''}
                        onChange={(e) => updateSetting('contactEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="text"
                        value={data.settings?.contactPhone || ''}
                        onChange={(e) => updateSetting('contactPhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        value={data.settings?.address || ''}
                        onChange={(e) => updateSetting('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Nội dung chính (Hero)</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề chính</label>
                    <input
                      type="text"
                      value={data.hero.title}
                      onChange={(e) => updateHero('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả phụ</label>
                    <textarea
                      value={data.hero.subtitle}
                      onChange={(e) => updateHero('subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
                    <input
                      type="text"
                      value={data.hero.image}
                      onChange={(e) => updateHero('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="mt-2">
                      <img src={data.hero.image} alt="Preview" className="h-40 rounded-md object-cover" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-medium text-gray-900">Các lĩnh vực ứng dụng</h2>
                    <button onClick={addFeature} className="flex items-center text-sm text-emerald-600 hover:text-emerald-700">
                      <Plus className="h-4 w-4 mr-1" /> Thêm lĩnh vực
                    </button>
                  </div>
                  <div className="space-y-8">
                    {data.features.map((feature: any, index: number) => (
                      <div key={feature.id} className="p-4 border border-gray-200 rounded-lg relative">
                        <button
                          onClick={() => removeFeature(index)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => updateFeature(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Tên Lucide Icon)</label>
                            <input
                              type="text"
                              value={feature.icon}
                              onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                            <textarea
                              value={feature.desc}
                              onChange={(e) => updateFeature(index, 'desc', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={2}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-sm font-medium text-gray-700">URL Hình ảnh</label>
                              <button
                                onClick={() => openImageModal('feature', index, feature.title)}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                              >
                                <ImageIcon className="w-3 h-3" /> Tạo ảnh AI
                              </button>
                            </div>
                            <input
                              type="text"
                              value={feature.image}
                              onChange={(e) => updateFeature(index, 'image', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                            />
                            <img src={feature.image} alt="Preview" className="h-32 rounded-md object-cover" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'locations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-medium text-gray-900">Vị trí bản đồ</h2>
                    <button onClick={addLocation} className="flex items-center text-sm text-emerald-600 hover:text-emerald-700">
                      <Plus className="h-4 w-4 mr-1" /> Thêm vị trí
                    </button>
                  </div>
                  <div className="space-y-4">
                    {data.locations.map((loc: any, index: number) => (
                      <div key={loc.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên vị trí</label>
                          <input
                            type="text"
                            value={loc.name}
                            onChange={(e) => updateLocation(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Vĩ độ (Lat)</label>
                          <input
                            type="number"
                            step="any"
                            value={loc.lat}
                            onChange={(e) => updateLocation(index, 'lat', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kinh độ (Lng)</label>
                          <input
                            type="number"
                            step="any"
                            value={loc.lng}
                            onChange={(e) => updateLocation(index, 'lng', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <button
                          onClick={() => removeLocation(index)}
                          className="mt-6 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <ImageGeneratorModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
        onSelectImage={handleImageSelect}
        defaultPrompt={imagePrompt}
      />
    </div>
  );
}
