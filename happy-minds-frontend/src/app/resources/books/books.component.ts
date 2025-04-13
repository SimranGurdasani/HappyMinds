import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  books = [
    {
      title: "The Happiness Project",
      image: "https://m.media-amazon.com/images/I/81qvmSdwQiL._SY466_.jpg",
      description: "A journey to discover what truly makes us happy.",
      
    },
    {
      title: "Mindset: The New Psychology of Success",
      image: "https://images-na.ssl-images-amazon.com/images/I/71sBtM3Yi5L.jpg",
      description: "How our mindset influences success and personal growth.",
    },
    {
      title: "Deep Work",
      image: "https://m.media-amazon.com/images/I/91ZEUnFeUSL._SY445_SX342_.jpg",
      description: "A guide to focused success in a distracted world.",
    },
    {
      title: "The Alchemist",
      image: "https://m.media-amazon.com/images/I/51bDuU2p5zL._SY445_SX342_.jpg",
      description: "A mystical story about following your dreams.",
    },
    {
      title: "Daring Greatly",
      image: "https://m.media-amazon.com/images/I/41yvDAuGz-L._SY445_SX342_.jpg",
      description: "How vulnerability is a source of strength and courage.",
    }
  ];
}
