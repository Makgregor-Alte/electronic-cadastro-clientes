'use strict';

const Endereco = require('./src/Endereco');
const PessoaFisica = require('./src/PessoaFisica');
const PessoaJuridica = require('./src/PessoaJuridica');

const clientes = [];

// O try/catch impede que uma tentativa inválida interrompa as demais.
function cadastrar(descricao, criarCliente) {
  try {
    const cliente = criarCliente();
    clientes.push(cliente);
    console.log(`${descricao}: CADASTRADO`);
  } catch (erro) {
    console.log(`${descricao}: ERRO - ${erro.message}`);
  }
}

cadastrar('Cenário 1 - Pessoa física válida', () =>
  new PessoaFisica(
    'Ana Souza', '123.456.789-01', '2000-03-15',
    new Endereco('Rua das Flores', 120, 'Rio Grande', 'RS')
  )
);

cadastrar('Cenário 2 - Pessoa jurídica válida', () =>
  new PessoaJuridica(
    'Electronic', '12.345.678/0001-90', 'Electronic Comércio de Eletrônicos Ltda.',
    new Endereco('Avenida Brasil', 500, 'Porto Alegre', 'RS')
  )
);

cadastrar('Cenário 3 - Pessoa física inválida (CPF)', () =>
  new PessoaFisica(
    'Bruno Lima', '123.456', '1998-06-20',
    new Endereco('Rua Central', 45, 'Pelotas', 'RS')
  )
);

cadastrar('Cenário 4 - Pessoa jurídica inválida (razão social)', () =>
  new PessoaJuridica(
    'Empresa Exemplo', '98.765.432/0001-10', '   ',
    new Endereco('Rua do Comércio', 80, 'Rio Grande', 'RS')
  )
);

console.log('\n=== CLIENTES VÁLIDOS CADASTRADOS ===');
console.log(JSON.stringify(clientes, null, 2));
console.log(`\nTotal de clientes válidos: ${clientes.length}`);
