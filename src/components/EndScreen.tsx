import React from 'react';
import { GameStats } from '../types/game';

interface EndScreenProps {
  stats: GameStats;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ stats, onPlayAgain }) => {
  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy >= 90) return "Excellent! You're a phishing detection expert!";
    if (accuracy >= 80) return "Great job! You have strong phishing detection skills!";
    if (accuracy >= 70) return "Good work! You're getting better at spotting phishing sites.";
    if (accuracy >= 60) return "Not bad! Keep practicing to improve your skills.";
    return "Keep learning! Practice will help you spot phishing sites better.";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 Hoàn Thành!
            </h1>
            <p className="text-xl text-gray-600">
              {getPerformanceMessage(stats.accuracy)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Kết quả cuối cùng</h3>
              <p className={`text-3xl font-bold ${getScoreColor(stats.totalScore)}`}>
                {stats.totalScore}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Độ chính xác</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.accuracy}%
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Kết quả đúng</h3>
              <p className="text-3xl font-bold text-purple-600">
                {stats.correctAnswers}/{stats.totalRounds}
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Thời gian trung bình</h3>
              <p className="text-3xl font-bold text-orange-600">
                {stats.averageTime}s
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💡 Tips để cải thiện
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">🔍</span>
                <p>Luôn luôn check URLs thật kĩ - ltìm lỗi chính tả hoặc tên miền đáng ngờ</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">⚠️</span>
                <p>Hãy cảnh giác với những tin nhắn khẩn cấp yêu cầu cung cấp thông tin cá nhân</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">🔒</span>
                <p>Kiểm tra chứng chỉ SSL và chỉ số bảo mật phù hợp</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">🎨</span>
                <p>Tìm kiếm chất lượng thiết kế kém hoặc thương hiệu không nhất quán</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">📧</span>
                <p>Đừng tin vào những email không mong muốn yêu cầu bạn nhấp vào liên kết</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Chơi lại
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Game mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
