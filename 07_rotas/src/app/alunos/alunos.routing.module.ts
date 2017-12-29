import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

import { AlunosGuard } from './../guards/alunos.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
const alunosRoutes: Routes = [
    { path: '', component: AlunosComponent,
        canActivateChild: [AlunosGuard],
        children: [ //vazio pq já está declarado no appRouting
            { path: 'novo', component: AlunoFormComponent,
                canDeactivate: [AlunosDeactivateGuard] },        
            { path: ':id', component: AlunoDetalheComponent,
                resolve: { aluno: AlunoDetalheResolver } },    
            { path: ':id/editar', component: AlunoFormComponent,
                canDeactivate: [AlunosDeactivateGuard] }
        ]
    }
];

@NgModule({  
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})


export class AlunosRoutingModule { }