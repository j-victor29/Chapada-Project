ALTER TABLE public.municipios
ADD COLUMN IF NOT EXISTS codigo_ibge text UNIQUE,
ADD COLUMN IF NOT EXISTS estado text,
ADD COLUMN IF NOT EXISTS microrregiao text;
