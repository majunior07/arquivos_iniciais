class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		//método for in() recupera as chaves de um array ou os atributos de um Objeto
		//e essa chave ou esse atributo é colocado dentro de uma variável
		
		//como vamos percorrer os atributos do Objeto Despesa em questão
		// vamos fazer um for in no próprio Objeto, utilizando o this, this 
		//faz referência para a Despesa, que está sendo criada na 
		//função cadastrarDespesa()
		for(let i in this) {
			//console.log(i, this[i])
			//utilizar this que é um Objeto literal com [], passando um determinado 
			//atributo, é como acessar a informação do Objeto literal utilizando o 
			//.(ponto) e o nome do atributo, nesse caso o operador i, recupera os atributos

			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}

		return true
		
	}
}

class Bd {
	//É necessário armazenar a informação de índice 	
	//É fundamental que a aplicação, o Objeto Bd, tenha condições de identificar qual é o próximo índice
	//que poderá utilizar para inserção do registro

	//É necessario um Id inicial
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			//localStorage.setItem() serve para inserir um dado dentro de localStorage
			localStorage.setItem('id', 0)
		} 
	}

	getProximoId() {
		//localStorage.getItem() serve para recuperar um dado dentro de localStorage
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	//Acessar o recurso de localStorage, através da instrução localStorage, 
	//retorna um objeto de manipulação do localStorage do Browser
	//então temos acesso a alguns métodos

	//localStorage.setItem() permite passar 2 parâmetros, o primeiro é a identificação do Objeto que 
	//vamos armazenar, nesse caso 'despesa', e o segundo parâmetro, é o dado que queremos 
	//armazenar, sendo que esse dado precisa ser encaminhadoa través de uma notação JSON, 
	//como estamos trabalhando com um Objeto literal, precisamos converter esse Objeto literal 
	//para uma notação JSON
  
	gravar(d) {

		let id = this.getProximoId()

		//localStorage.setItem() serve para inserir um dado dentro de localStorage
		//localStorage.setItem('despesa', JSON.stringify(d)) 
		//foi substituido por localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem(id, JSON.stringify(d))
		//JSON.stringify(d) 
		//precisamos transformar o Objeto literal em uma notação JSON, vamos utilizar um Objeto nativo 
		//do JavaScript que é o Objeto JSON, a partir dele podemos executar a função JSON.stringify() 
		//passando por parâmetro o Objeto literal que queremos converter para uma notação JSON 		

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage 
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))
			// biblioteca JSON, método JSON.parse() 
			// valor recuperado de localStorage, que é uma string JSON, antes de ser atribuido a variável,
			// vai ser submetida ao Objeto JSON, para o método JSON.parse(), sendo convertida para um Objeto literal.

			//verificar se existe a possibilidade de haver índices que foram pulados ou removidos
			// nesse caso, vamos pular esses índices
			if(despesa === null) {
				continue
				//continue dentro de uma estrutura de laço, faz com que o laço avance para a iteração seguinte
				//desconsiderando tudo que estiver abaixo
				// o continue vai acontecer quando a despesa for igual a null, pulando para a próxima iteração 
				//do laço, antes que o push daquela despesa null seja realizada.
			}

			despesa.id = i
			despesas.push(despesa)
			//A cada iteração do laço, a despesa recuperada de localStorage, já convertida em um Objeto literal 
			//e será inserida dentro do array despesas. Para fazer isso utilizamos o método push, nativo de 
			//Objetos do tipo array. O array despesas é recuperado, e é executado o método push passando despesa, 
			//a cada iteração, vamos acrescentar a despesa dentro do array despesas 

		}

		return despesas

	}

	pesquisar(despesa) {

		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarTodosRegistros()

		console.log(despesa)

		console.log(despesasFiltradas)

		//Filtros de:

		/*ano
		recuperar o array, executar o método .filter(), passando a função de Callback. A função de 
 		Callback recebe um parâmetro que é o valor contido naquele determinado índice, já que será
 		percorrido cada um dos índices para fazer essa checagem, e na sequência precisamos retornar
 		true ou false, baseado em alguma condição, nesse caso a condição é verificar se o atributo 
 		ano do Objeto literal, contido naquele determinado índice, portanto d.ano, é igual ao Objeto 
 		despesa que será utilizado no filtro, nesse caso despesa.ano, que está sendo recebido por 
 		parâmetro. Comparando essas duas informações, teremos true ou false para cada um dos valores 
 		contidos dentro do array despesasFiltradas, decidindo se aquele determinado valor, deve ou não 
 		ser retornado.
 		*/
 		if(despesa.ano != '') { 
 			console.log('filtro de ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
			/* O método .filter() não atua sobre o array original, então é necessário atualizar o 
			valor do array original, atribuindo o resultado do .filter() a esse respectivo array 
			*/
 		}

		//mes
		if(despesa.mes != '') { 
			console.log('filtro de mes')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != '') {
			console.log('filtro de dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if(despesa.tipo != '') {
			console.log('filtro de tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if(despesa.descricao != '') {
			console.log('filtro de descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != '') {
			console.log('filtro de valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id) {
		localStorage.removeItem(id)
	}

}

let bd = new Bd()

function cadastrarDespesa() {
	
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
		)

	if(despesa.validarDados()) {   
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		// dialog de sucesso
		$('#modalRegistraDespesa').modal('show')

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show')
	}
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
	
	if(despesas.length == 0 && filtro == false) { 
		despesas = bd.recuperarTodosRegistros()
	}

	//selecionando o elemento tbody	da tabela
	let listaDespesas = document.getElementById('listaDespesas')

	//limpar o conteúdo de listaDespesas do tbody, antes da inserção 
	//dos conteúdos novos
	listaDespesas.innerHTML = ''

	/*
	<tr>
		0 = <td>15/03/2018</td>
		1 = <td>Alimentação</td>
		2 = <td>Compras do mês</td>
		3 = <td>444.75</td>
	</tr>
	*/

	//precisamos percorrer cada um dos itens do nosso array, precisamos atuar sobre o array despesas
	//que é o array que contém os nossos Objetos

	//percorrer o array despesas, listando cada despesa de forma dinâmica  

	despesas.forEach(function(d) {
	//Objetos do tipo array, possuem o método forEach(), que permite percorrer cada uma das posições 
	//do array, recuperando o seu respectivo valor interno.
	//Sendo que esse valor, ele é recuperado dentro de uma função de callback, que é passada para o  
	//forEach() através do primeiro parâmetro, então é possível tomar uma ação com base nessa instrução.

	//console.log(d)	
	//console.log() do valor contido em cada uma das posições do array

		//console.log(d)
		//Podemos recuperar as despesas e associar essas despesas,
		//os valores contidos dentro de cada um dos Objetos, 
		//a cada uma das colunas
		//console.log do parâmetro d, que é recebido na função 
		//de callBack e encaminhada para o forEach()



		//criando a linha (tr)
		//recuperar listaDespesas que é tbody em consulta.HTML
		let linha = listaDespesas.insertRow()
		// .insertRow() é o método que faz parte do elemento tbody e que 
		//possibilita a inserção de linhas

		//inserir valores, criar as colunas (td)
		//recuperar linha que  é a referência do elemento tr criado no 
		//momento do laço, e executar o método .insertCell()
		//linha.insertCell(0).innerHTML
		//.insertCell() de uma linha (tr) espera um parâmetro para identificar 
		//qual coluna deve ser criada, partindo da coluna zero.
		
		//.innerHTML representa o conteúdo interno de uma tag
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
		
		//ajustar o tipo
		switch(d.tipo) {
		case '1': d.tipo = 'Alimentação'
			break
		case '2': d.tipo = 'Educação'
			break
		case '3': d.tipo = 'Lazer'
			break
		case '4': d.tipo = 'Saúde'
			break
		case '5': d.tipo = 'Transporte'
			break
		}

		linha.insertCell(1).innerHTML = d.tipo

		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor 

		//criar o botão de exclusão
		let btn = document.createElement("button")
		//recuperar a referência que contém a tr que está sendo criada
		//método .append() para fazer a inclusão do elemento btn dentro da 
		//célula 4 que está sendo criada na linha, que por sua vez está sendo
		//criada dentro de tbody, em cada uma das interações do forEach()
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}` 
		btn.onclick = function() { 
			//remover a despesa 
			let id = this.id.replace('id_despesa_', '')
			//.replace() vai substituir 'id_despesa_' por ''

			//alert(id)
			//alert(this.id)
			//recuperar o próprio elemento clicado, por isso o this,
			//e na sequência acessar o atributo id do elemento clicado

			bd.remover(id)

			window.location.reload()
			//window.location.reload(), para recarregar a página

		}

		linha.insertCell(4).append(btn)

		console.log(d)
		//a variável d é a despesa recuperada em cada um dos índices
		//do array de despesas, d representa a despesa
	})	

}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').value 
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
	//vamos instanciar o Objeto Despesa, com base na classe Despesa, que foi 
	//definida no começa do script de "app.js", e o constructor espera alguns 
	//parâmetros, que já estamos recuperando dentro da função pesquisarDespesa(),
	//basta passar esses valores.
	//como está sendo recuperado o value do campo HTML, então pode ser passado 
	//a variável diretamente, porque a variável contém o value e não a referência.

	let despesas = bd.pesquisar(despesa)

	this.carregaListaDespesas(despesas, true)


}






