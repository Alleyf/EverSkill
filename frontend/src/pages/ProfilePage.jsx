import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase, Activity, Settings } from 'lucide-react';
import { userAPI, skillAPI, distillAPI } from '../lib/api';

function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [distillations, setDistillations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [userRes, skillsRes, distillRes] = await Promise.all([
        userAPI.profile(),
        userAPI.mySkills(),
        userAPI.myDistillations(),
      ]);
      setUser(userRes.data);
      setSkills(skillsRes.data);
      setDistillations(distillRes.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              {user?.username}
            </span>
            <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600">
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <User size={40} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.username}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
              <p className="text-sm text-gray-500">
                加入时间：{new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-4 px-4">
              {[
                { id: 'skills', label: '我的 Skills', icon: Briefcase, count: skills.length },
                { id: 'distillations', label: '蒸馏任务', icon: Activity, count: distillations.length },
                { id: 'settings', label: '设置', icon: Settings },
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
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">我的 Skills</h2>
                  <button
                    onClick={() => navigate('/distill/create')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    创建新 Skill
                  </button>
                </div>
                {skills.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Briefcase size={48} className="mx-auto mb-2 opacity-50" />
                    <p>暂无 Skills，开始创建你的第一个 Skill 吧！</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                        onClick={() => navigate(`/skill/${skill.id}`)}
                      >
                        <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {skill.description}
                        </p>
                        <div className="text-xs text-gray-500">
                          {new Date(skill.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'distillations' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">蒸馏任务</h2>
                {distillations.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Activity size={48} className="mx-auto mb-2 opacity-50" />
                    <p>暂无蒸馏任务</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {distillations.map((distill) => (
                      <div
                        key={distill.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{distill.target_name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              distill.status === 'completed'
                                ? 'bg-green-100 text-green-600'
                                : distill.status === 'processing'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {distill.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {distill.description}
                        </p>
                        <div className="text-xs text-gray-500">
                          创建时间：{new Date(distill.created_at).toLocaleDateString()}
                        </div>
                        {distill.status === 'completed' && distill.skill_id && (
                          <button
                            onClick={() => navigate(`/skill/${distill.skill_id}`)}
                            className="mt-2 text-sm text-purple-600 hover:underline"
                          >
                            查看生成的 Skill →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">账户设置</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">用户名</label>
                    <input
                      type="text"
                      defaultValue={user?.username}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">邮箱</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    保存修改
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

export default ProfilePage;
