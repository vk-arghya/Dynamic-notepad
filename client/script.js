const socket = io();
const editor = document.getElementById('editor');
const themeToggle = document.getElementById('themeToggle');
//const generateBtn = document.getElementById('generateBtn');
//const generatedLink = document.getElementById('generatedLink');

// Handle theme switching based on saved state in localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

// Set the toggle state based on current theme
if (currentTheme === 'dark') {
  themeToggle.checked = true;
}

// Toggle theme on click
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Save the theme preference
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light'); // Save the theme preference
  }
});

// Handle typing and sync
editor.addEventListener('input', () => {
  socket.emit('text-change', editor.value);
});

socket.on('text-update', (data) => {
  editor.value = data;
});

/* // Generate link logic
generateBtn.addEventListener('click', () => {
  const code = Math.random().toString(36).substring(2, 8);
  generatedLink.innerText = `Share this code: ${code}`;
  generatedLink.classList.remove('hidden');
}); */
