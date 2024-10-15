export class Feedback {
  input_text: string;
  predicted_class: string;
  correct_class: string;

  constructor(
    input_text: string,
    predicted_class: string,
    correct_class: string
  ) {
    this.input_text = input_text;
    this.predicted_class = predicted_class;
    this.correct_class = correct_class;
  }
}
