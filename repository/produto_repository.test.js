const produtoRepository = require("./produto_repository.js");

// Função auxiliar para limpar a lista de produtos (apenas para os testes)
beforeEach(() => {
    // Resetar a lista de produtos e o idGerador
    produtoRepository.listar().length = 0;
    idGerador = 1;
});

//Cenário de sucesso
test('Quando inserir o produto arroz, deve retornar e conter na lista o produto com id=1'
    , () => {
    //produto que se espera ser cadastrado (com id)
    const produtoInseridoEsperado = {
    id: 1,
    nome: "Arroz",
    categoria: "alimento",
    preco: 4.00
    };
    //Inserindo o produto no repositorio
    const produtoInserido = produtoRepository.inserir({
    nome: "Arroz",
    categoria: "alimento",
    preco: 4.00
    });
    //Verificando se o produto inserido que retornou está correto
    expect(produtoInserido).toEqual(produtoInseridoEsperado);
    //Verificando se o produto foi inserido no repositório
    expect(produtoRepository.listar()).toContainEqual(produtoInseridoEsperado);
    })

//Cenário de exceção
test('Quando inserir o produto sem categoria, não deve retornar e não insere na lista'
    , () => {
    //Criado o cenário (com id=2 porque conta o teste anterior) para o produto inserido sem categoria
    const produtoInseridoErrado = {
    id: 2,
    nome: "Massa",
    preco: 4.00
    };
    //Inserindo o produto sem categoria
    const produtoInserido = produtoRepository.inserir({
    nome: "Massa",
    preco: 4.00
    });
    //O produto não deve retornar
    expect(produtoInserido).toEqual(undefined);
    //Não deve inserir na lista o produto errado
    expect(produtoRepository.listar()).not.toContainEqual(produtoInseridoErrado);
    })

    
//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
    //Vou inserir um segundo produto para o teste (id=2)
    const produtoInserido = produtoRepository.inserir({
    nome: "Feijao",
    categoria: "alimento",
    preco: 7.00
    });
    const resultado = produtoRepository.buscarPorId(produtoInserido.id);
    //Podemos fazer testes mais simples:
    expect(resultado).toBeDefined();
    expect(resultado.nome).toBe("Feijao")
    });
    //Cenário de exceção - buscarPorId()
    test('Quando buscar por id inexistente, deve retornar undefined', () => {
    const resultado = produtoRepository.buscarPorId(10);
    expect(resultado).toBeUndefined();
    });


//Cenário de sucesso - atualizar()
test('Quando atualizar um produto existente, deve retornar o produto atualizado', () => {
    // Vou inserir um produto inicial
    const produtoInserido = produtoRepository.inserir({
        nome: "Arroz",
        categoria: "Alimento",
        preco: 4.7
    });

    // Atualizar o produto inserido
    const produtoAtualizado = produtoRepository.atualizar(produtoInserido.id, {
        nome: "Feijão",
        categoria: "Alimento",
        preco: 6.5,
        id: produtoInserido.id
    });

    // Verifico se o produto foi atualizado corretamente
    expect(produtoAtualizado).toBeDefined();
    expect(produtoAtualizado.nome).toBe("Feijão");
    expect(produtoAtualizado.preco).toBe(6.5);
});

//Cenário de exceção - atualizar()
test('Quando tentar atualizar um produto inexistente, deve retornar undefined', () => {
    // Tento atualizar um produto com ID inexistente
    const resultado = produtoRepository.atualizar(99, {
        nome: "Feijão",
        categoria: "Alimento",
        preco: 6.5,
        id: 99
    });

    // Verifico que o resultado é undefined
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - deletar()
test('Quando deletar um produto existente, deve retornar o produto deletado', () => {
    // Inserir um produto inicial
    const produtoInserido = produtoRepository.inserir({
        nome: "Arroz",
        categoria: "Alimento",
        preco: 4.7
    });

    // Deletar o produto
    const produtoDeletado = produtoRepository.deletar(produtoInserido.id);

    // Verifico se o produto foi deletado corretamente
    expect(produtoDeletado).toBeDefined();
    expect(produtoDeletado.id).toBe(produtoInserido.id);
});

//Cenário de exceção - deletar()
test('Quando tentar deletar um produto inexistente, deve retornar undefined', () => {
    // Tento deletar um produto com ID inexistente
    const resultado = produtoRepository.deletar(99);

    // Verifico que o resultado é undefined
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - pesquisarPorCategoria()
test('Quando pesquisar por uma categoria existente, deve retornar os produtos da categoria', () => {
    // Inserir alguns produtos
    produtoRepository.inserir({ nome: "Arroz", categoria: "Alimento", preco: 4.7 });
    produtoRepository.inserir({ nome: "Feijão", categoria: "Alimento", preco: 6.5 });

    // Pesquisar produtos da categoria "Alimento"
    const resultado = produtoRepository.pesquisarPorCategoria('Alimento');

    // Verifico se o resultado é correto (2 produtos)
    expect(resultado).toHaveLength(2);
    expect(resultado[0].nome).toBe("Arroz");
    expect(resultado[1].nome).toBe("Feijão");
});

//Cenário de exceção - pesquisarPorCategoria()
test('Quando pesquisar por uma categoria inexistente, deve retornar um array vazio', () => {
    const resultado = produtoRepository.pesquisarPorCategoria('Eletrônicos');
    expect(resultado).toHaveLength(0);
});

