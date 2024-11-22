import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Input } from "@/components/input.tsx";
import {Separator} from "./lib.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Input />
        <Separator />
    </React.StrictMode>
);