'use strict';

const Pessoa = require('./Pessoa');

class PessoaJuridica extends Pessoa {
  #cnpj;
  #razaoSocial;

  constructor(nome, cnpj, razaoSocial, endereco) {
    super(nome, endereco);
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
  }

  get cnpj() { return this.#cnpj; }
  set cnpj(valor) {
    if (typeof valor !== 'string' && typeof valor !== 'number') {
      throw new Error('CNPJ deve conter exatamente 14 dígitos.');
    }
    const cnpjLimpo = String(valor).replace(/[.\-/\s]/g, '');
    if (!/^\d{14}$/.test(cnpjLimpo)) {
      throw new Error('CNPJ deve conter exatamente 14 dígitos.');
    }
    this.#cnpj = cnpjLimpo;
  }

  get razaoSocial() { return this.#razaoSocial; }
  set razaoSocial(valor) {
    if (typeof valor !== 'string' || !valor.trim()) {
      throw new Error('Razão social é obrigatória.');
    }
    this.#razaoSocial = valor.trim();
  }

  toJSON() {
    return {
      tipo: 'Pessoa Jurídica',
      ...this._resumoBase(),
      cnpj: this.cnpj,
      razaoSocial: this.razaoSocial
    };
  }
}

module.exports = PessoaJuridica;
