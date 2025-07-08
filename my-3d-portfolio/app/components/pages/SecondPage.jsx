import { motion } from 'framer-motion';
import localFont from 'next/font/local';

// Подключение шрифтов
const specialEliteRu = localFont({
    src: '../../../public/fonts/clarendonbt/specialelite-cyrillic.ttf',
    display: 'swap',
  })
  

export default function SecondPage() {
  return (
    <div className="bg-white  ">
      <div className="max-w-6xl ml-[10vw]">
        {/* Заголовок */}
        <motion.h2 
          className={`text-[3.47vw] max-md:text-6xl font-bold mb-12 text-gray-900 ${specialEliteRu.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ТЕРАПИЯ
        </motion.h2>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Левая колонка - описание */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Консультации проводятся онлайн по видеозвонку, аудиозвонку или по переписке (зависит от запроса)
            </p>

            <h3 className="text-2xl font-semibold text-gray-900">
              Первая оценочная сессия длится 2 часа:
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                <span>Сбор анамнеза</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                <span>Обсуждение / постановка запроса</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                <span>Постановка целей терапии</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                <span>Домашнее задание + диагностика когнитивных функций, психо-эмоционального состояния</span>
              </li>
            </ul>
          </motion.div>

          {/* Правая колонка - цены */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Первая консультация */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">ПЕРВАЯ КОНСУЛЬТАЦИЯ</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">7000 РУБ</p>
              <p className="text-gray-600">Последующие консультации длится 50–60 минут</p>
              <p className="text-3xl font-bold text-gray-900 mt-4">3500 РУБ</p>
            </div>

            {/* Экспресс-сессия */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">ЭКСПРЕСС-СЕССИЯ</h3>
              <p className="text-gray-700 mb-4">
                Подходит тем, кому не нужна полноценная терапия, но нужно разобрать какой-то вопрос, 
                ситуацию или нужна помощь специалиста в каком-то затруднении
              </p>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-2xl font-bold text-gray-900">60 МИНУТ</p>
                <p className="text-4xl font-bold text-gray-900">5000 РУБ</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}