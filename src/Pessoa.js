'use strict';

const Endereco = require('./Endereco');

class Pessoa {
  #nome;
  #endereco;

  constructor(nome, endereco) {
    if (new.target === Pessoa) {
      throw new Error('Pessoa é uma classe base e não pode ser instanciada diretamente.');
    }
    this.nome = nome;
    this.endereco = endereco;
  }

  get nome() { return this.#nome; }
  set nome(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 3) {
      throw new Error('Nome deve conter ao menos 3 caracteres.');
    }
    this.#nome = valor.trim();
  }

  get endereco() { return this.#endereco; }
  set endereco(valor) {
    if (!(valor instanceof Endereco)) {
      throw new Error('Endereço deve ser uma instância da classe Endereco.');
    }
    this.#endereco = valor;
  }

  // Método protegido por convenção (_), pois JavaScript não possui 'protected'.
  _resumoBase() {
    return { nome: this.nome, endereco: this.endereco.toJSON() };
  }
}

module.exports = Pessoa;
