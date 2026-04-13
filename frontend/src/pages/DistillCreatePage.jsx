import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, FileText, Image, Video, Music, Zap } from 'lucide-react';
import { distillAPI } from '../lib/api';

function DistillCreatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    target_name: '',
    description: '',
    goal: '',
  });
  const [materials, setMaterials] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [distillId, setDistillId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    try {
      const response = await distillAPI.create(formData);
      setDistillId(response.data.id);
      setStep(2);
    } catch (error) {
      alert('Failed to create task: ' + error.message);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !distillId) return;

    setUploading(true);
    for (const file of files) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      try {
        await distillAPI.uploadMaterial(distillId, formDataUpload);
        setMaterials([...materials, { name: file.name, type: file.type, size: file.size }]);
      } catch (error) {
        alert(`Failed to upload ${file.name}: ${error.message}`);
      }
    }
    setUploading(false);
  };

  const handleStartDistill = async () => {
    try {
      await distillAPI.start(distillId);
      setStep(3);
    } catch (error) {
      alert('Failed to start distillation: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-600">
            🌊 SkillDistill
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className={step >= 1 ? 'text-purple-600 font-semibold' : ''}>步骤 1: 创建任务</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-purple-600 font-semibold' : ''}>步骤 2: 上传材料</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-purple-600 font-semibold' : ''}>步骤 3: AI 蒸馏</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {step === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              创建蒸馏任务
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  蒸馏对象名称 *
                </label>
                <input
                  type="text"
                  name="target_name"
                  value={formData.target_name}
                  onChange={handleInputChange}
                  placeholder="例如：李白、爱因斯坦、我的爷爷"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  简要描述
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="用一两句话描述这个对象的特点"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  蒸馏目标 *
                </label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  placeholder="你希望这个 Skill 具备什么能力？例如：能够以李白的风格写诗，或者像爱因斯坦一样解释物理概念"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={handleCreateTask}
                disabled={!formData.target_name || !formData.goal}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                下一步：上传材料
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              上传背景材料
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              上传与 {formData.target_name} 相关的多模态材料，AI 将基于这些材料进行蒸馏
            </p>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                拖拽文件到此处，或点击选择文件
              </p>
              <p className="text-sm text-gray-500 mb-4">
                支持格式：TXT, PDF, MD, JPG, PNG, MP3, MP4 等
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                选择文件
              </label>
              {uploading && <p className="mt-2 text-sm text-blue-600">上传中...</p>}
            </div>

            {/* Material List */}
            {materials.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">已上传的材料 ({materials.length})</h3>
                <div className="space-y-2">
                  {materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {material.type.startsWith('image/') ? (
                        <Image size={20} className="text-blue-500" />
                      ) : material.type.startsWith('video/') ? (
                        <Video size={20} className="text-green-500" />
                      ) : material.type.startsWith('audio/') ? (
                        <Music size={20} className="text-purple-500" />
                      ) : (
                        <FileText size={20} className="text-gray-500" />
                      )}
                      <span className="flex-1 text-sm">{material.name}</span>
                      <span className="text-xs text-gray-500">
                        {(material.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                上一步
              </button>
              <button
                onClick={handleStartDistill}
                disabled={materials.length === 0}
                className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                开始 AI 蒸馏
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="text-purple-600" size={40} />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              AI 蒸馏进行中
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              正在分析材料并生成 {formData.target_name} 的专属 Skill...
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div className="bg-purple-600 h-3 rounded-full animate-pulse w-2/3"></div>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              这可能需要几分钟时间，请耐心等待
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              查看进度
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default DistillCreatePage;
