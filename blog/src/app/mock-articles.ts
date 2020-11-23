import { Article } from './article'
export const ARTICLES: Article[] = [
    {
        id: 1,
        title: 'My first article',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor metus nec egestas vulputate. Nullam tincidunt blandit convallis. Suspendisse justo lacus, efficitur et blandit id, vehicula in lectus. Cras ipsum mi, tempus nec enim vel, luctus efficitur tortor. Duis sagittis ac purus eu vehicula. Aenean bibendum tempor iaculis. Pellentesque et ornare lectus. Sed nunc ligula, venenatis sed fringilla varius, tristique vel turpis.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor metus nec egestas vulputate. Nullam tincidunt blandit convallis. Suspendisse justo lacus, efficitur et blandit id, vehicula in lectus. Cras ipsum mi, tempus nec enim vel, luctus efficitur tortor. Duis sagittis ac purus eu vehicula. Aenean bibendum tempor iaculis. Pellentesque et ornare lectus. Sed nunc ligula, venenatis sed fringilla varius, tristique vel turpis.</p>',
        description: 'This is my frist article! Please read it',
        key: 'my-first-article',
        date: new Date(),
        imageUrl: 'https://angular.io/assets/images/logos/angular/angular.png'
    },
    {
        id: 2,
        title: 'My second article',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor metus nec egestas vulputate. Nullam tincidunt blandit convallis. Suspendisse justo lacus, efficitur et blandit id, vehicula in lectus. Cras ipsum mi, tempus nec enim vel, luctus efficitur tortor. Duis sagittis ac purus eu vehicula. Aenean bibendum tempor iaculis. Pellentesque et ornare lectus. Sed nunc ligula, venenatis sed fringilla varius, tristique vel turpis.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor metus nec egestas vulputate. Nullam tincidunt blandit convallis. Suspendisse justo lacus, efficitur et blandit id, vehicula in lectus. Cras ipsum mi, tempus nec enim vel, luctus efficitur tortor. Duis sagittis ac purus eu vehicula. Aenean bibendum tempor iaculis. Pellentesque et ornare lectus. Sed nunc ligula, venenatis sed fringilla varius, tristique vel turpis.</p>',
        description: 'This is my second article!to pla',
        key: 'my-second-article',
        date: new Date(),
        imageUrl: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.png'
    }
];