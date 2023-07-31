import 'regenerator-runtime/runtime';
import Image from 'next/image';
import styles from './page.module.css';
import dynamic from "next/dynamic";
import Link from "next/link";

import Upload from "@/components/upload";
import QuestionInput from "@/components/questionInput";
import ChatBody from "@/components/chatBody";


export default function Home() {

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Transit Tech</h1>


            <ChatBody/>
        </main>
    );
}
