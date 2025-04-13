import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  isItem2Visible:boolean=true;
  // Carousel
  currentSlide = 0;
  slides = [
    {
      backgroundImage: 'https://images.pexels.com/photos/796607/pexels-photo-796607.jpeg?auto=compress&cs=tinysrgb&w=600',
      quoteText: 'Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.',
      quoteAuthor: '- Harsh Ahuja',
    },
    {
      backgroundImage: 'https://images.pexels.com/photos/7723819/pexels-photo-7723819.jpeg?auto=compress&cs=tinysrgb&w=600',
      quoteText: 'You don’t have to be positive all the time. It’s perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn’t make you a negative person. It makes you human.',
      quoteAuthor: '- Simran Gurdasani',
    },
    {
      backgroundImage: 'https://images.pexels.com/photos/5868960/pexels-photo-5868960.jpeg?auto=compress&cs=tinysrgb&w=600',
      quoteText: 'It’s okay to not be okay. Just don’t give up. Allow yourself to feel, then pick yourself up and keep going.',
      quoteAuthor: '- Rushil Rohra',
    },
    {
      backgroundImage: 'https://images.pexels.com/photos/5868967/pexels-photo-5868967.jpeg?auto=compress&cs=tinysrgb&w=600',
      quoteText: 'Mental health is not a destination, but a process. It’s about how you drive, not where you’re going.',
      quoteAuthor: '- Sanjana Bhatia',
    },
  ];

  // Testimonials
  currentTestimonial = 0;
  testimonials = [
    {
      text: 'This service changed my life! I feel more supported and understood.',
      author: '- Jane Doe',
    },
    {
      text: 'The therapists are amazing and always available when I need them.',
      author: '- John Smith',
    },
    {
      text: 'I love the multi-lingual support. It makes communication so easy.',
      author: '- Maria Garcia',
    },
    {
      text: 'The art therapy sessions helped me express myself in ways I never thought possible.',
      author: '- David Brown',
    },
  ];

  // FAQ
  activeFAQ: number | null = null;
  faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Booking a service is as easy as selecting your desired category, choosing a provider, and picking a convenient time slot. It’s that simple!',
    },
    {
      question: 'Can I track my service provider?',
      answer: 'Absolutely! Our real-time tracking feature allows you to see exactly where your service provider is and their estimated time of arrival. No more waiting in the dark!',
    },
    {
      question: 'What payment options are available?',
      answer: 'We offer secure in-app payment integration for a hassle-free transaction experience. Pay with ease and focus on enjoying your freshly serviced home!',
    },
    {
      question: 'How can I leave a review?',
      answer: 'After your service is completed, you can rate and leave a review for your service provider. Your feedback helps us maintain the highest quality standard!',
    },
    {
      question: 'Need help with a complaint?',
      answer: 'Our dedicated customer support team is here to assist you with any issues or complaints. We’re committed to ensuring your satisfaction every step of the way!',
    },
  ];

  // Carousel Methods
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  // Testimonials Methods
  goToTestimonial(index: number) {
    this.currentTestimonial = index;
  }

  // FAQ Methods
  toggleFAQ(index: number) {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}