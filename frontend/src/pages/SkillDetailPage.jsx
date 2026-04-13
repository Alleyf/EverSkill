import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, MessageSquare, User, Book, Brain } from 'lucide-react';
import { skillAPI } from '../lib/api';

function SkillDetailPage() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkill();
  }, [id]);

  const loadSkill = async () => {
    try {
      const response = await skillAPI.get(id);
      setSkill(response.data);
    } catch (error) {
      console.error('Failed to load skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const newHistory = [...chatHistory, { role: 'user', content: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');
    
    try {
      const response = await skillAPI.test(id, chatMessage);
      setChatHistory([...newHistory, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      setChatHistory([...newHistory, { role: 'system', content: 'Error: ' + error.message }]);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await skillAPI.download(id);
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${skill.name}.zip`;
      link.click();
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Skill not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-600">
            🌊 SkillDistill
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download size={18} />
              下载
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Share2 size={18} />
              分享
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Skill Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {skill.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{skill.description}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User size={16} />
              {skill.creator?.username || 'Anonymous'}
            </span>
            <span>•</span>
            <span>{new Date(skill.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{skill.downloads || 0} 次下载</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-4 px-4">
              {[
                { id: 'overview', label: '概览', icon: Book },
                { id: 'persona', label: '人设', icon: User },
                { id: 'test', label: '测试', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">技能描述</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {skill.description}
                </p>
                <h3 className="text-lg font-semibold mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'persona' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">人设信息</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    {skill.persona || 'No persona information available'}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                      <Brain size={48} className="mx-auto mb-2 opacity-50" />
                      <p>开始与 {skill.name} 对话吧！</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-purple-600 text-white'
                              : msg.role === 'system'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入消息..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    发送
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SkillDetailPage;
