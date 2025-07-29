-- Create databases for each microservice
CREATE DATABASE dashboard;
CREATE DATABASE notas_fiscais;
CREATE DATABASE notificacoes;
CREATE DATABASE pagamentos;
CREATE DATABASE usuarios;

-- Grant all privileges to admin user on all databases
GRANT ALL PRIVILEGES ON DATABASE dashboard TO admin;
GRANT ALL PRIVILEGES ON DATABASE notas_fiscais TO admin;
GRANT ALL PRIVILEGES ON DATABASE notificacoes TO admin;
GRANT ALL PRIVILEGES ON DATABASE pagamentos TO admin;
GRANT ALL PRIVILEGES ON DATABASE usuarios TO admin;