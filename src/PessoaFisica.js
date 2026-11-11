'use strict';

const Pessoa = require('./Pessoa');

class PessoaFisica extends Pessoa {
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento, endereco) {
    super(nome, endereco);
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  get cpf() { return this.#cpf; }
  set cpf(valor) {
    if (typeof valor !== 'string' && typeof valor !== 'number') {
      throw new Error('CPF deve conter exatamente 11 dígitos.');
    }
    const cpfLimpo = String(valor).replace(/[.\-/\s]/g, '');
    if (!/^\d{11}$/.test(cpfLimpo)) {
      throw new Error('CPF deve conter exatamente 11 dígitos.');
    }
    this.#cpf = cpfLimpo;
  }

  get dataNascimento() { return this.#dataNascimento; }
  set dataNascimento(valor) {
    if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      throw new Error('Data de nascimento deve estar no formato AAAA-MM-DD e ser válida.');
    }
    const [ano, mes, dia] = valor.split('-').map(Number);
    const data = new Date(0);
    data.setUTCFullYear(ano, mes - 1, dia);
    data.setUTCHours(0, 0, 0, 0);
    if (data.getUTCFullYear() !== ano || data.getUTCMonth() !== mes - 1 || data.getUTCDate() !== dia) {
      throw new Error('Data de nascimento inválida.');
    }
    const agora = new Date();
    const hoje = [agora.getFullYear(),
      String(agora.getMonth() + 1).padStart(2, '0'),
      String(agora.getDate()).padStart(2, '0')].join('-');
    if (valor > hoje) {
      throw new Error('Data de nascimento não pode estar no futuro.');
    }
    this.#dataNascimento = valor;
  }

  toJSON() {
    return {
      tipo: 'Pessoa Física',
      ...this._resumoBase(),
      cpf: this.cpf,
      dataNascimento: this.dataNascimento
    };
  }
}

module.exports = PessoaFisica;
