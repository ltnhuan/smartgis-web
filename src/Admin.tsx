import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, Edit2, LogOut, MapPin, Image as ImageIcon, Type, LayoutDashboard } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
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
    </div>
  );
}
