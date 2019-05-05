import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;

  constructor(private router: Router,
    private title: Title,
    private meta: Meta) {
    console.log('BreadcrumbsComponent');
    this.getRouterData().subscribe((data) => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag:  MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag( metaTag );

    });
   }

  ngOnInit() {
  }

  getRouterData() {
    return this.router.events.pipe(
      filter(events => events instanceof ActivationEnd),
      filter((events: ActivationEnd) => events.snapshot.firstChild  == null),
      map((events: ActivationEnd) => events.snapshot.data));
  }

}
