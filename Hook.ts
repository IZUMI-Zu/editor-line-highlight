/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useEffect, RefObject } from 'react';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // 你可以选择其他样式  

const useRenderHighlight = (
    element: HTMLElement | RefObject<HTMLElement> | null,
) => {
    const render = (element) => {
        if (!element) return;

        // 查找所有的代码块  
        const codeBlocks = element.querySelectorAll('pre code');

        codeBlocks.forEach((block) => {
            // 获取代码块的内容  
            const codeContent = block.textContent;

            // 查找需要高亮的行  
            const match = codeContent.match(/```(\w+)?\s*\{(\d+)-(\d+)\}/);
            if (match) {
                const lang = match[1];
                const startLine = parseInt(match[2], 10);
                const endLine = parseInt(match[3], 10);

                // 移除标记行  
                const cleanedCode = codeContent.replace(/```(\w+)?\s*\{(\d+)-(\d+)\}/, '').trim();
                block.textContent = cleanedCode;

                // 高亮代码  
                Prism.highlightElement(block);

                // 分割代码内容为行  
                const codeLines = cleanedCode.split('\n');

                // 创建新的代码块 HTML  
                const highlightedCode = codeLines.map((line, index) => {
                    if (index + 1 >= startLine && index + 1 <= endLine) {
                        return `<span class="highlight">${line}</span>`;
                    }
                    return line;
                }).join('\n');

                // 设置新的 HTML 内容  
                block.innerHTML = highlightedCode;
            } else {
                // 高亮代码  
                Prism.highlightElement(block);
            }
        });
    };

    useEffect(() => {
        if (!element) {
            return;
        }

        let targetElement;
        if (element instanceof HTMLElement) {
            targetElement = element;
        } else {
            targetElement = element.current;
        }
        render(targetElement);
        const observer = new MutationObserver(() => {
            render(targetElement);
        });

        observer.observe(targetElement, {
            childList: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [element]);
};

export { useRenderHighlight };
