import React, { useState, useEffect } from 'react';

// Main container for the entire application
function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // default dark mode

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
     <div className={`flex h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200' : 'bg-gradient-to-r from-blue-100 via-gray-100 to-gray-100 text-gray-900'}`}>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} theme={theme} />
      <MainChat setIsSidebarOpen={setIsSidebarOpen} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

// Left-hand sidebar component
function Sidebar({ isSidebarOpen, setIsSidebarOpen, theme }) {
  const bg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const border = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const hover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-full md:w-1/3 p-4 ${bg} border-r ${border} z-50 overflow-y-auto transition-colors duration-700`}>
    {/* Search Bar */}
      <div className={`flex items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} mb-4`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="w-full ml-2 bg-transparent outline-none"
        />
      </div>
      {/* Close button for mobile */}
      <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Chat List */}
      <div className="space-y-4">
        <ChatPreview name="User Name" message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit." time="15:34" avatarColor="bg-blue-500" theme={theme} />
        <ChatPreview name="User Name" message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit." time="15:34" avatarColor="bg-green-500" theme={theme} />
        <ChatPreview name="User Name" message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit." time="15:34" avatarColor="bg-blue-500" theme={theme} />
        <ChatPreview name="User Name" message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit." time="15:34" avatarColor="bg-pink-500" theme={theme} />
      </div>
    </div>
  );
}

// Chat preview component
function ChatPreview({ name, message, time, avatarColor, theme }) {
  const hover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
  return (
    <div className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${hover}`}>
      <div className={`w-12 h-12 rounded-full ${avatarColor} mr-3 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{name}</h4>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{time}</span>
    </div>
  );
}

// Main chat area
function MainChat({ setIsSidebarOpen, theme, toggleTheme }) {
  const bg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  return (
    <div className={`flex flex-col flex-1 ${bg}`}>
      <ChatHeader setIsSidebarOpen={setIsSidebarOpen} theme={theme} toggleTheme={toggleTheme} />
      <MessageArea theme={theme} />
      <MessageInput theme={theme} />
    </div>
  );
}

// Chat header
function ChatHeader({ setIsSidebarOpen, theme, toggleTheme }) {
  const bg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const border = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  return (
    <div className={`p-4 flex items-center border-t ${border} ${bg} transition-colors duration-700`}>

      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mr-4 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
        <h2 className="font-bold text-lg truncate">User Name</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-gray-400 hover:text-black">
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>
    </div>
  );
}

// Message area
function MessageArea({ theme }) {
  const messages = [
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", time: "22:22", sent: true },
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", time: "11:55", sent: false },
    { text: "21 July", isDate: true },
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", time: "22:05", sent: true },
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", time: "22:11", sent: false },
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", time: "22:22", sent: true },
    { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", time: "22:22", sent: false },
  ];

  const bg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';

  return (
    <div className={`flex flex-col flex-1 p-6 overflow-y-auto space-y-2 ${bg}`}>
      {messages.map((msg, index) =>
        msg.isDate ? (
          <div key={index} className={`text-center text-sm my-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{msg.text}</div>
        ) : (
          <MessageBubble key={index} text={msg.text} time={msg.time} sent={msg.sent} theme={theme} />
        )
      )}
    </div>
  );
}

// Message bubble
function MessageBubble({ text, time, sent, theme }) {
  const bubbleClasses = sent
  ? `${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400 text-white'} self-end rounded-br-none break-words max-w-full md:max-w-[70%] transition-colors duration-700`
  : `${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} self-start rounded-bl-none break-words max-w-full md:max-w-[70%] transition-colors duration-700`;


  return (
    <div className={`flex flex-col p-3 rounded-xl mb-2 ${bubbleClasses}`}>
      <p className="whitespace-pre-wrap">{text}</p>
      <span className={`text-xs text-right mt-1 opacity-70 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{time}</span>
    </div>
  );
}

// Message input
function MessageInput({ theme }) {
  const bg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const border = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  return (
    <div className={`p-4 flex items-center border-t ${border} ${bg} transition-colors duration-700`}>
      <input
        type="text"
        placeholder="Message..."
        className={`flex-1 p-3 rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500'}`}
      />
      <button className="ml-4 p-3 rounded-full bg-blue-600 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}

export default Chat;
