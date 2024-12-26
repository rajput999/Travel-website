import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const DatePicker = ({ selectedDate, onChange, error }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (day) => {
    const selected = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    if (!isPastDate(selected)) {
      onChange(selected);
      setShowCalendar(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="relative">
      <div className="relative h-[40px] sm:h-[48px]">
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          onClick={() => setShowCalendar(!showCalendar)}
          className={`w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Select Travel Date"
        />
        <CalendarIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={16} />
      </div>

      {showCalendar && (
        <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-64">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <div className="font-semibold">
              {months[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
            </div>
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
              const isDisabled = isPastDate(date);

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && handleDateClick(day)}
                  disabled={isDisabled}
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
                    ${isSelected(date) ? 'bg-orange-500 text-white' : ''}
                    ${isToday(date) ? 'border border-orange-500' : ''}
                    ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-orange-100'}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;