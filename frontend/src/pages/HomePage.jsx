import { Link } from 'react-router-dom';
import { Brain, Users, Zap, ArrowRight } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          🌊 SkillDistill
        </Link>
        <div className="space-x-6">
          <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-purple-600">
            个人中心
          </Link>
          <Link 
            to="/distill/create" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            开始蒸馏
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          万物皆可蒸馏为 Skill
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          将历史人物、虚构角色、行业专家或任何对象的多模态背景材料，
          通过 AI 蒸馏技术转化为可交互、可分享的专属 Skill
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/distill/create" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-lg transition flex items-center gap-2"
          >
            <Zap size={20} />
            创建你的第一个 Skill
            <ArrowRight size={20} />
          </Link>
          <Link 
            to="#features" 
            className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg px-8 py-3 rounded-lg transition"
          >
            了解更多
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          核心功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              AI 智能蒸馏
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              基于大语言模型自动解析多模态材料，提取核心特征，构建完整人设和技能规则
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              社区共享
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              浏览、下载、测试他人创建的 Skill，与全球创作者交流灵感
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              持续进化
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              根据交互反馈不断优化 Skill，支持版本管理和协同编辑
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-gray-800 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          如何工作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: 1, title: '创建任务', desc: '设定蒸馏目标和对象' },
            { step: 2, title: '上传材料', desc: '导入文本、图片、音视频等' },
            { step: 3, title: 'AI 处理', desc: '自动解析并生成 Skill 结构' },
            { step: 4, title: '发布分享', desc: '测试后发布到社区' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2024 SkillDistill. 万物蒸馏，智慧传承</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-purple-600">关于我们</a>
          <a href="#" className="hover:text-purple-600">使用条款</a>
          <a href="#" className="hover:text-purple-600">隐私政策</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
