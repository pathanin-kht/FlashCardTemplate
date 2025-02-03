let vocabularies = [];
        let reviewVocabularies = [];
        let currentIndex = 0;
        let isReviewMode = false;

        function addVocabulary() {
            const word = document.getElementById('wordInput').value.trim();
            const meaning = document.getElementById('meaningInput').value.trim();
            
            if (word && meaning) {
                vocabularies.push({ word, meaning });
                document.getElementById('wordInput').value = '';
                document.getElementById('meaningInput').value = '';
                updateVocabList();
            }
        }

        function updateVocabList() {
            const list = document.getElementById('vocabList');
            list.innerHTML = vocabularies.map((vocab, index) => `
                <div class="vocab-item">
                    <div><strong>${vocab.word}</strong></div>
                    <div>${vocab.meaning}</div>
                    <button class="danger" onclick="deleteVocabulary(${index})">Delete</button>
                </div>
            `).join('');
        }

        function deleteVocabulary(index) {
            vocabularies.splice(index, 1);
            updateVocabList();
        }

        function toggleMode() {
            isReviewMode = !isReviewMode;
            if (isReviewMode && vocabularies.length > 0) {
                reviewVocabularies = [...vocabularies];
                currentIndex = 0;
                document.getElementById('addMode').style.display = 'none';
                document.getElementById('reviewMode').style.display = 'block';
                document.getElementById('modeToggleBtn').textContent = 'Back to Word List';
                showCurrentWord();
            } else {
                document.getElementById('addMode').style.display = 'block';
                document.getElementById('reviewMode').style.display = 'none';
                document.getElementById('modeToggleBtn').textContent = 'Start Review';
            }
        }

        function showCurrentWord() {
            if (reviewVocabularies.length === 0) {
                document.getElementById('reviewWord').textContent = 'Review Complete!';
                document.getElementById('reviewMeaning').style.display = 'none';
                document.querySelector('.button-group').style.display = 'none';
                return;
            }

            document.getElementById('reviewWord').textContent = reviewVocabularies[currentIndex].word;
            document.getElementById('reviewMeaning').textContent = reviewVocabularies[currentIndex].meaning;
            document.getElementById('reviewMeaning').style.display = 'none';
            document.querySelector('.button-group').style.display = 'flex';
            
            updateProgress();
        }

        function toggleMeaning() {
            const meaningElement = document.getElementById('reviewMeaning');
            meaningElement.style.display = meaningElement.style.display === 'none' ? 'block' : 'none';
        }

        function markAsKnown() {
            reviewVocabularies.splice(currentIndex, 1);
            
            if (currentIndex >= reviewVocabularies.length) {
                currentIndex = 0;
            }
            
            showCurrentWord();
        }

        function markAsKnown() {
            reviewVocabularies.splice(currentIndex, 1);
            
            if (currentIndex >= reviewVocabularies.length) {
                currentIndex = 0;
            }
            
            showCurrentWord();
            updateProgress();  
        }
        
        function updateProgress() {
            const total = vocabularies.length;
            const remaining = reviewVocabularies.length;
            const completed = total - remaining;
            document.getElementById('progress').textContent = 
                `Reviewed ${completed} of ${total} words`;
        }
        