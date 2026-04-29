// Mock user database
const USERS: Record<string, any> = {
  'alice@echo.com': { password: 'alice', role: 'shopper', userId: 'user0' },
  'bob@echo.com': { password: 'bob', role: 'shopper', userId: 'user1' },
  'manager@echo.com': { password: 'admin', role: 'manager' },
  'researcher@echo.com': { password: 'science', role: 'researcher' }
};

export function login(email: string, password: string) {
  const user = USERS[email];
  if (user && user.password === password) {
    const session = { role: user.role, userId: user.userId, email };
    localStorage.setItem('echo_session', JSON.stringify(session));
    return session;
  }

  // Fallback for dynamic userX@echo.com
  if (email.startsWith('user') && email.endsWith('@echo.com')) {
    const userIdMatch = email.match(/user\d+/);
    if (userIdMatch && userIdMatch[0] === password) {
      const session = { role: 'shopper', userId: userIdMatch[0], email };
      localStorage.setItem('echo_session', JSON.stringify(session));
      return session;
    }
  }

  return null;
}

export function logout() {
  localStorage.removeItem('echo_session');
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('echo_session');
  return session ? JSON.parse(session) : null;
}
