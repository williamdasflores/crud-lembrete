import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMsgComponent } from '../../compartilhado/error-msg/error-msg.component';
import { LembreteService } from '../../services/lembrete.service';
import { Lembrete } from '../../interfaces/lembrete';

@Component({
  selector: 'app-editar-lembrete',
  templateUrl: './editar-lembrete.component.html',
  styleUrls: ['./editar-lembrete.component.css']
})
export class EditarLembreteComponent {
  public lembrete: Lembrete;
  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.getLembrete(this.activatedRoute.snapshot.params.id);
    }

  getLembrete(id: number) {
    this.lembreteService.getLembrete(id)
      .subscribe((lembrete: Lembrete) => {
        this.lembrete = lembrete;
      }, () => { this.errorMsgComponent.setError('Falha ao recuperar lembrete!'); });
  }

  atualizarLembrete(lembrete: Lembrete) {
    this.lembreteService.atualizarLembrete(lembrete)
      .subscribe(
        () => { this.router.navigateByUrl('/'); },
        () => { this.errorMsgComponent.setError('Falha ao atualizar lembrete!'); });
  }

}
