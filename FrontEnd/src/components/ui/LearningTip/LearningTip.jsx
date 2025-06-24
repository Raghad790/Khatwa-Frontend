import styles from './LearningTip.module.css';
import { Lightbulb } from 'lucide-react';

const tips = [
  "Break your study sessions into focused 25-minute sprints (Pomodoro Technique).",
  "Summarize what you learn in your own words to boost retention.",
  "Practice active recall after lessons—test yourself without notes.",
  "Set clear, achievable learning goals for each week.",
  "Teach a concept to someone else to deepen your understanding."
];

const todayIndex = new Date().getDate() % tips.length;
const todayTip = tips[todayIndex];

export default function LearningTip() {
  return (
    <div className={styles.tipCard}>
      <div className={styles.iconBox}><Lightbulb size={28} /></div>
      <div>
        <div className={styles.label}>Today's Learning Tip</div>
        <div className={styles.tip}>{todayTip}</div>
      </div>
    </div>
  );
}