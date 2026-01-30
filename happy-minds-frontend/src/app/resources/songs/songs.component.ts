import { Component } from '@angular/core';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  title = '🎵 Recommended Songs';

  songs = [
    { title: 'Rise Up - Andra Day', artist: 'Andra Day', image: '../../../assets/andra-day.jpg', youtubeLink: 'https://www.youtube.com/watch?v=kNKu1uNBVkU' },
    { title: 'Keep Your Head Up - Andy Grammer', artist: 'Andy Grammer', image: '../../../assets/andy-grammer.jpg', youtubeLink: 'https://www.youtube.com/watch?v=CmrOB_q3tjo' },
    { title: 'Skyscraper - Demi Lovato', artist: 'Demi Lovato', image: '../../../assets/demi-lovato.jpg', youtubeLink: 'https://www.youtube.com/watch?v=r_8ydghbGSg' },
    { title: 'Fight Song - Rachel Platten', artist: 'Rachel Platten', image: '../../../assets/rachel-plattern.jpg', youtubeLink: 'https://www.youtube.com/watch?v=xo1VInw-SKc' },
    { title: 'Happy - Pharrell Williams', artist: 'Pharrell Williams', image: '../../../assets/pharrell-williams.jpg', youtubeLink: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
    { title: 'Stronger - Kelly Clarkson', artist: 'Kelly Clarkson', image: '../../../assets/kelly-clarkson.jpg', youtubeLink: 'https://www.youtube.com/watch?v=Xn676-fLq7I' },
    { title: 'Don’t Stop Believin’ - Journey', artist: 'Journey', image: '../../../assets/journey.jpg', youtubeLink: 'https://www.youtube.com/watch?v=1k8craCGpgs' },
    { title: 'Unwritten - Natasha Bedingfield', artist: 'Natasha Bedingfield', image: '../../../assets/natasha-bedingfield.jpg', youtubeLink: 'https://www.youtube.com/watch?v=b7k0a5hYnSI' },
    { title: 'The Climb - Miley Cyrus', artist: 'Miley Cyrus', image: '../../../assets/miley-cyrus.jpg', youtubeLink: 'https://www.youtube.com/watch?v=NG2zyeVRcbs' },
    { title: 'Shake It Off - Taylor Swift', artist: 'Taylor Swift', image: '../../../assets/taylor-swift.jpg', youtubeLink: 'https://www.youtube.com/watch?v=nfWlot6h_JM' }
  ];
}
