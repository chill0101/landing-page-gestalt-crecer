// Authentication utilities for secure endpoints

/**
 * Sanitize input to prevent XSS and injection attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove data: URLs
    .replace(/data:/gi, '')
    // Remove common injection patterns
    .replace(/-->/g, '')
    .replace(/<!--/g, '')
    .replace(/<!/g, '')
    // Trim and limit length
    .trim()
    .substring(0, 10000);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Verify JWT token
 * @param {string} token - Authorization token
 * @returns {boolean} - Whether token is valid
 */
export async function verifyToken(token) {
  if (!token) return false;
  
  try {
    const tokenValue = token.replace('Bearer ', '');
    
    // Basic validation - check format
    if (!tokenValue || tokenValue.length < 10) {
      return false;
    }
    
    // In production, use proper JWT verification:
    // const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    // return decoded && decoded.role === 'admin';
    
    // For now, accept valid-format tokens for demo
    return tokenValue !== 'undefined' && tokenValue !== 'null';
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

/**
 * Generate authentication token
 * @param {object} payload - User data to include in token
 * @returns {string} - Generated JWT token
 */
export function generateToken(payload) {
  // In production, use proper JWT library:
  // return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return 'mock-jwt-token-' + Date.now();
}

/**
 * Middleware for protecting routes
 * @param {object} request - HTTP request object
 * @param {function} next - Next middleware function
 * @returns {Response} - Authenticated response or error
 */
export async function requireAuth(request, next) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization required' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
  
  const isAuthenticated = await verifyToken(authHeader);
  
  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: 'Invalid authorization token' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
  
  return next(request);
}