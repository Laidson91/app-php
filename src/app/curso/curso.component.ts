import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  // URL base
  url = "http://localhost/api/php/";

  //Vetor de cursos
  vetor: Curso[] = [];

  //Objeto da classe Curso
  curso = new Curso();


  constructor(private curso_service: CursoService) {}

  ngOnInit() {
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //Cadastro
  cadastro(){
    this.curso_service.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //Atualizar a listagem
        this.selecao();
      }
    )
  }

    //Seleção
    selecao(){
      this.curso_service.obterCursos().subscribe(
        (res: Curso[]) => {
          this.vetor = res;
        }
      )
    }

    //Alterar
    alterar(){
      this.curso_service.atualizarCurso(this.curso).subscribe(
        (res) => {

          //Atualizar vetor
          this.vetor = res;

          //Limpar os valores do Objeto
          this.curso.nomeCurso = "";
          this.curso.valorCurso = 0;

          //Atualizar a listagem
          this.selecao();
        }
      )
    }

    //Remover
    remover(){
      this.curso_service.removerCurso(this.curso).subscribe(
        (res : Curso[]) => {
          this.vetor = res;

          this.curso.nomeCurso = "";
          this.curso.valorCurso = 0;
        }
      )
    }

      //Selecionar curso especifico
      selecionarCurso(c: Curso){
        this.curso.idCurso = c.idCurso;
        this.curso.nomeCurso = c.nomeCurso;
        this.curso.valorCurso = c.valorCurso;
      }


}
