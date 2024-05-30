import { Component } from '@angular/core';
import { QuizServiceService } from '../QuizService/quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  currentQuestion = 0;
  questions: any = [];
  selectedAnswers: any = [];
  selectedOption: any;
  showResult = false;
  score = 0;

  constructor(private quizService: QuizServiceService) {}

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  nextQuestion() {
    if (this.selectedOption !== undefined) {
      this.selectedAnswers.push(this.selectedOption);
      this.selectedOption = undefined;
    }
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    } else {
      this.showResult = true;
      this.calculateScore();
    }
  }

  previousQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion--;
    } else {
      this.showResult = true;
      this.calculateScore();
    }
  }

  submitQuiz() {
    if (this.selectedOption !== undefined) {
      this.selectedAnswers.push(this.selectedOption);
      this.selectedOption = undefined;
    }
    this.showResult = true;
    this.calculateScore();
  }

  calculateScore() {
    this.score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (
        this.questions[i].options[this.selectedAnswers[i]] ===
        this.questions[i].answer
      ) {
        this.score++;
      }
    }
  }
}
