(function () {

    console.log("Extensão carregada!");


// Adiciona botão
    var d1 = document.getElementsByTagName("html");

    var html_tag = d1[0];

    var extrai_hora = function (celula) {
        var marcacao;
        marcacao = celula.textContent.trim().split(":");
        if (marcacao.length != 2) {
            return null
        }
        var data = new Date(2000, 1, 1, marcacao[0], marcacao[1]);
        return data;
    };
    var adiciona_celula = function (linha, texto) {
        linha.insertAdjacentHTML('beforeend', '<td>' + texto + '</td>')
    };
    var calcula = function () {
        var tabelas = document.getElementById('principal').contentWindow.document.getElementsByTagName('table');

        var tabela = null;
        //Escolhe a tabela de marcações
        for (var i = 0; i < tabelas.length; i++) {
            if (tabelas[i].innerHTML.indexOf("Per. Apontamento") > -1) {
                tabela = tabelas[i];
                break;
            }
        }

        //Cancela se nào encontrou a tabela
        console.log(tabela);
        if (tabela == null) {
            return false;
        }

        //Itera sobre as linhas da tabela
        var linhas = tabela.getElementsByTagName('tr');
        for (var i = 0; i < linhas.length; i++) {
            var linha = linhas[i];
            var celulas = linha.getElementsByTagName('td');

            //Escolhe as linhas validas pelo seu tamanho
            if (celulas.length != 9) {
                continue;
            }

            //Calcula o tempo
            var entrada = extrai_hora(celulas[2]);
            var intervalo_in = extrai_hora(celulas[3]);
            var intervalo_out = extrai_hora(celulas[4]);
            var saida = extrai_hora(celulas[5]);

            if (entrada == null || intervalo_in == null || intervalo_out == null || saida == null){
                adiciona_celula(linha, "Faltou Marcação");
            }
            else{
                var tempo = new Date(saida-entrada-(intervalo_out-intervalo_in));
                var horas = Math.floor(tempo/(1000*3600));
                var minutos = (tempo/(1000*60))%60;
                adiciona_celula(linha, horas + ":" + minutos);
            }



        }


    };


    html_tag.insertAdjacentHTML('beforeend', '<div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">' +
        '<p class="plus">+</p>' +
        '</div>');

    document.getElementById('floating-button').addEventListener("click", calcula)

})();