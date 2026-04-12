import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [message, setMessage] = useState('Welcome to SkillDistill!')
  const [healthStatus, setHealthStatus] = useState(null)

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health/`)
      setHealthStatus(response.data)
    } catch (error) {
      setHealthStatus({ error: error.message })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8">
          🌊 SkillDistill
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {message}
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            万物蒸馏 Skill 平台
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            将任意对象的多模态背景材料蒸馏为专属 Skill
          </p>
          
          <button
            onClick={checkHealth}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            检查后端状态
          </button>
          
          {healthStatus && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                后端状态:
              </h3>
              <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-auto">
                {JSON.stringify(healthStatus, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              多模态导入
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              支持文本、图片、音频、视频等多种格式的背景材料
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              AI 驱动蒸馏
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              基于大语言模型自动提取特征、构建人设、生成技能规则
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              一键发布
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              生成的 Skill 可下载、分享、测试，支持持续进化
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
