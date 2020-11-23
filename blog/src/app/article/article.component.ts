import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(parms => {
      const key = parms.key;
      this.articleService.getArticle(key).subscribe(
        article => {
          //Ako ne postoji article prebaci na:
          if(article === undefined){
            //prebacujem na 404 stranicu
            this.router.navigateByUrl('404')
            return;
          }
          //Ako ima article
          this.article = article;
          //menja naslov stranice
          this.titleService.setTitle(
            `${this.article.title} - ${this.sharedService.blogTitle}`
          );
          //Meta tagovi za share-ovanje na social networks
          this.meta.addTags([
            {name: 'description', content: this.article.description},
            {name: 'og:title', content: `${this.article.title} - ${this.sharedService.blogTitle}`},
            {name: 'og:type', content: "website"},
            {name: 'og:url', content: this.sharedService.baseUrl + this.article.key},
            {name: 'og:image', content: this.article.imageUrl},
            {name: 'og:description', content: this.article.description},
            {name: 'og:site_name', content: this.sharedService.blogTitle},
          ]);
        }
      )
    })
  }

}
