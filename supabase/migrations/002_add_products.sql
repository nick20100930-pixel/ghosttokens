-- Add OpenAI, Claude, and Gemini products
INSERT INTO products (name, description, provider, api_type, price_cents, quota_tokens, validity_days, is_active) VALUES
('OpenAI API Key', 'Access GPT-4, DALL-E, and Whisper APIs', 'OpenAI', 'openai', 2999, 1000000, 30, true),
('Claude API Key', 'Access Claude 3.5 Sonnet and Opus models', 'Anthropic', 'claude', 3499, 1000000, 30, true),
('Gemini API Key', 'Access Gemini Pro and Ultra models', 'Google', 'gemini', 1999, 1000000, 30, true);
