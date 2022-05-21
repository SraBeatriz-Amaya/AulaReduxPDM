const Redux = require('redux')
const {createStore, combineReducers} = Redux
    
    
    const criarContrato = (nome, valor) => {
    return {
        type: "CRIAR_CONTRATO",
        payload: {
            nome, valor
        }
    }
}

function cancelarContrato (nome){
    return {
        type: "CANCELAR_CONTRATO",
        payload: { nome }
    }
}

function SolicitarCashback (nome, valor){
    return {
        type:"SOLICITAR_CASHBACK",
        payload: {nome, valor}
    }
}

const historicoDePedidosDeCashbackReducer = (historicoDePedidosDeCashbackAtual = [], acao) => {
    if (acao.type === "SOLICITAR_CASHBACK"){
        return [
            ...historicoDePedidosDeCashbackAtual,
            acao.payload    
        ]
    }
    return historicoDePedidosDeCashbackAtual
}

const CaixaReducer = (caixa = 0, acao) => {

    if(acao.type === "CRIAR_CONTRATO"){
        return caixa + acao.payload.valor
        
    }else if(acao.type === "SOLICITAR_CASHBACK"){
        return caixa - acao.payload.valor
    }
    return caixa
}

const ContratosReducer = (ListaContratoAtual = [], acao) => {
    if (acao.type === "CANCELAR_CONTRATO"){
        return ListaContratoAtual.filter(contrato => contrato.nome !== acao.payload.nome)
    }
    else if (acao.type === "CRIAR_CONTRATO"){
        return [
            ...ListaContratoAtual,
            acao.payload
        ]
    }
    return ListaContratoAtual
}

const todosOsReducers = combineReducers({
    historicoDePedidosDeCashbackReducer,
    CaixaReducer,
    ContratosReducer
})

const store = createStore(todosOsReducers)

//criar Contrato Jose
const acaoCriarContratoJose = criarContrato('José', 50)
store.dispatch(acaoCriarContratoJose)
console.log(store.getState())

//Cria Contrato Maria
const acaoCriarContratoMaria = criarContrato('Maria', 50)
store.dispatch(acaoCriarContratoMaria)
console.log(store.getState())

//Solicitacao de CashBack Jose -20 
const acaoSolicitarCashbackJose = SolicitarCashback('José', 20)
store.dispatch(acaoSolicitarCashbackJose)
console.log(store.getState())

//Solicitacao de CashBack Maria -10
const acaoSolicitarCashbackMaria = SolicitarCashback('Maria', 10)
store.dispatch(acaoSolicitarCashbackMaria)
console.log(store.getState())

//Cancelar Contrato de Maria
const acaoCancelarContrato = cancelarContrato('Maria')
store.dispatch(acaoCancelarContrato)
console.log(store.getState())