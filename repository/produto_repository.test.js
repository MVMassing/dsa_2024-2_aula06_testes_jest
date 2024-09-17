const produtoRepository = require("./produto_repository.js");

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