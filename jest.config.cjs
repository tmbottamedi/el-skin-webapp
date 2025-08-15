// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const nextJest = require("next/jest");

// Fornece o caminho para a sua aplicação Next.js para que o Jest possa carregar os ficheiros next.config.js e .env no ambiente de teste
const createJestConfig = nextJest({
  dir: "./",
});

// Configurações personalizadas do Jest que serão passadas
const customJestConfig = {
  // Adiciona mais configurações de setup antes de cada teste ser executado
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Se estiver a usar TypeScript com um baseUrl setado para o diretório src, precisará disto para os aliases funcionarem
  moduleDirectories: ["node_modules", "src"],

  // O ambiente de teste que será usado
  testEnvironment: "jest-environment-jsdom",

  // Mapeador de módulos para simular importações de ficheiros de estilo e outros recursos
  moduleNameMapper: {
    // Lida com CSS Modules
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Lida com aliases de módulo (se você os configurou no tsconfig.json)
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^styles/(.*)$": "<rootDir>/src/styles/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^config/(.*)$": "<rootDir>/src/config/$1",
    "^service/(.*)$": "<rootDir>/src/service/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
  },

  // Ignora transformações para node_modules, exceto para bibliotecas que usam sintaxe ESM
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

// createJestConfig é exportado desta forma para garantir que o next/jest possa carregar a configuração do Next.js corretamente
// eslint-disable-next-line no-undef
module.exports = createJestConfig(customJestConfig);
