document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('faqContainer').style.display = 'none';
});

function closeWelcome() {
    document.getElementById('welcomePopup').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('welcomePopup').style.display = 'none';
        document.getElementById('faqContainer').style.display = 'block';
    }, 500);
}

const questions = {
    1: [
        { question: 'What is a data structure?', answer: 'A data structure is a specialized format for organizing, processing, and storing data in a way that allows efficient access and modification. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs, each serving specific use cases based on how data is utilized in algorithms.' },
        { question: 'What is a linked list?', answer: 'A linked list is a linear data structure where elements, called nodes, are stored in containers. Each node holds a value and a reference to the next node in the sequence, allowing efficient insertions and deletions. Unlike arrays, linked lists do not require contiguous memory locations.' },
        { question: 'What is a stack?', answer: 'A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. It allows insertion and deletion only at one end, called the top of the stack. Stacks are used in function call management, undo mechanisms, and expression evaluation.' },
        { question: 'What is a queue?', answer: 'A queue is a linear data structure that follows the First In, First Out (FIFO) principle, meaning elements are inserted at the back and removed from the front. Queues are used in scenarios like task scheduling, printing jobs, and breadth-first search algorithms.' },
        { question: 'What is a binary tree?', answer: 'A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. Binary trees are commonly used in searching and sorting algorithms, as well as for representing hierarchical data structures like file systems.' },
        { question: 'What is a graph?', answer: 'A graph is a collection of nodes (also called vertices) connected by edges. Graphs can be directed or undirected, and they are used to represent complex relationships, such as social networks, road maps, or web pages linked together.' },
        { question: 'What is a hash table?', answer: 'A hash table is a data structure that implements an associative array, or map, by associating keys with values. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found. This allows for very fast data retrieval.' },
        { question: 'What is a priority queue?', answer: 'A priority queue is an abstract data type similar to a regular queue, but where each element has a priority. Elements are dequeued in order of their priority rather than their order in the queue. It is commonly implemented using a heap data structure.' },
        { question: 'What is a dynamic array?', answer: 'A dynamic array is a resizable array that can grow or shrink in size as elements are added or removed. It provides the flexibility of a linked list combined with the direct access capability of an array. Dynamic arrays are often implemented using the concept of doubling the array size when capacity is reached.' },
        { question: 'What is a trie?', answer: 'A trie, or prefix tree, is a tree-like data structure used for storing strings, where each node represents a character of the string. It is mainly used in scenarios that require efficient retrieval of keys, such as autocomplete features or searching for words in a dictionary.' },
    ],
    2: [
        { question: 'What is data science?', answer: 'Data science is a multidisciplinary field that uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines techniques from statistics, computer science, and domain expertise to analyze, interpret, and visualize large datasets to help inform decision-making.' },
        { question: 'What is supervised learning?', answer: 'Supervised learning is a type of machine learning where an algorithm is trained on a labeled dataset, meaning that each training example is paired with the correct output. The model learns to map inputs to the corresponding outputs and can then predict outcomes for unseen data. Examples include classification and regression tasks.' },
        { question: 'What is unsupervised learning?', answer: 'Unsupervised learning is a type of machine learning where the algorithm is trained on data without labeled outcomes. It aims to find patterns or structures in the data, such as grouping similar data points (clustering) or reducing the dimensionality of the data. Common techniques include clustering algorithms like K-means and hierarchical clustering.' },
        { question: 'What is a neural network?', answer: 'A neural network is a series of algorithms that attempt to recognize relationships in a set of data through a process that mimics the way the human brain operates. Neural networks are composed of layers of nodes (neurons), and they are widely used in deep learning applications such as image recognition, natural language processing, and predictive analytics.' },
        { question: 'What is regression?', answer: 'Regression is a statistical method used in machine learning and data science to determine the relationship between one dependent variable and one or more independent variables. It predicts continuous outcomes, such as estimating the price of a house based on its features or forecasting sales over time.' },
        { question: 'What is classification?', answer: 'Classification is the task of predicting a categorical label for given input data. Common classification algorithms include decision trees, support vector machines, and logistic regression. It is used in applications like spam detection, medical diagnosis, and image recognition.' },
        { question: 'What is clustering?', answer: 'Clustering is an unsupervised learning technique that groups a set of objects in such a way that objects in the same group (or cluster) are more similar to each other than to those in other groups. Clustering is used in market segmentation, social network analysis, and biological data analysis.' },
        { question: 'What is data visualization?', answer: 'Data visualization is the graphical representation of data and information. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data. It is crucial for communicating results in data science.' },
        { question: 'What is big data?', answer: 'Big data refers to datasets that are too large or complex for traditional data-processing techniques to handle. Big data analytics involves using advanced algorithms and tools to analyze and gain insights from large, diverse data sets that come from various sources, including sensors, social media, and transaction logs.' },
        { question: 'What is a decision tree?', answer: 'A decision tree is a flowchart-like structure used for decision-making or prediction. Each node in the tree represents a decision or test on an attribute, and each branch represents the outcome of the decision. Decision trees are widely used in classification and regression tasks because they are easy to interpret and implement.' },
    ],
    3: [
        { question: 'What is OOP?', answer: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects, which can contain data in the form of fields (attributes or properties) and code in the form of methods (functions). OOP principles, including inheritance, encapsulation, abstraction, and polymorphism, help in organizing code for better reusability and scalability.' },
        { question: 'What is a class in OOP?', answer: 'A class in OOP is a blueprint or template from which objects are created. It defines the structure and behavior (properties and methods) that the objects created from the class will have. Classes help in organizing and structuring code, making it easier to create and manipulate objects in a modular way.' },
        { question: 'What is an object in OOP?', answer: 'An object is an instance of a class that contains real data and interacts with other objects or the system. Objects have attributes (data) and methods (functions) that define their behavior. In OOP, objects communicate with each other to perform various tasks in a system.' },
        { question: 'What is inheritance?', answer: 'Inheritance is a key concept in OOP that allows a class (called a subclass or derived class) to inherit attributes and methods from another class (called a superclass or base class). This promotes code reuse and establishes a natural hierarchical relationship between classes.' },
        { question: 'What is polymorphism?', answer: 'Polymorphism is the ability of different objects to be treated as instances of the same class through a common interface. In OOP, polymorphism allows one function or method to behave differently depending on the object that invokes it, enabling flexibility and extending functionality in systems.' },
        { question: 'What is encapsulation?', answer: 'Encapsulation is the practice of bundling the data (attributes) and the methods (functions) that operate on the data into a single unit or class. It restricts direct access to some of the object’s components, providing control over how data is modified or accessed.' },
        { question: 'What is abstraction?', answer: 'Abstraction in OOP is the concept of hiding complex implementation details from the user and exposing only the necessary parts of an object’s functionality. It simplifies interaction with objects by focusing on what they do rather than how they do it, making systems easier to manage and use.' },
        { question: 'What is method overloading?', answer: 'Method overloading is a feature in OOP that allows multiple methods to have the same name but differ in parameters (type, number, or both). This enables the same method to be used for different purposes, enhancing flexibility and readability in the code.' },
        { question: 'What is method overriding?', answer: 'Method overriding allows a subclass to provide its specific implementation of a method that is already defined in its superclass. This is used when a subclass needs to change or extend the behavior of an inherited method while maintaining the same method signature.' },
        { question: 'What is a constructor?', answer: 'A constructor is a special type of method used to initialize objects in OOP. It is automatically invoked when an object is created and can be used to set initial values for object attributes or to perform setup tasks. Constructors can also be overloaded to offer multiple ways to initialize an object.' },
    ],
    4: [
        { question: 'What is Digital Principle?', answer: 'Digital Principle refers to the fundamental concepts used in digital electronics, such as Boolean algebra, logic gates, and binary number systems. These principles form the basis for designing digital circuits and systems, enabling devices to perform logical operations using digital signals (0s and 1s).' },
        { question: 'What is Computer Organization?', answer: 'Computer Organization deals with how the hardware components of a computer are arranged and how they interact to execute instructions. It focuses on the architecture, memory hierarchy, input/output mechanisms, and the control unit, ensuring that the system functions as intended.' },
        { question: 'What is a flip-flop in digital circuits?', answer: 'A flip-flop is a basic memory element in digital electronics that can store one bit of information (0 or 1). Flip-flops are used in various applications like registers, counters, and memory devices, where they maintain the state of a binary input until a clock pulse changes its value.' },
        { question: 'What is a multiplexer?', answer: 'A multiplexer is a combinational circuit that selects one of many input signals and forwards the selected input to a single output line. Multiplexers are used in communication systems and data routing applications where multiple data streams need to be transmitted over a single channel.' },
        { question: 'What is a decoder?', answer: 'A decoder is a combinational circuit that converts binary data from n input lines into a maximum of 2^n unique output lines. Decoders are commonly used in memory address decoding, where they convert binary codes into specific control signals to select memory locations.' },
        { question: 'What is an ALU?', answer: 'The Arithmetic Logic Unit (ALU) is a critical component of a processor that performs all arithmetic and logical operations, such as addition, subtraction, multiplication, and bitwise operations. The ALU takes input from registers and delivers results to other parts of the CPU for further processing.' },
        { question: 'What is memory hierarchy?', answer: 'Memory hierarchy is the organization of different types of memory based on their speed, cost, and capacity. It includes registers, cache, main memory (RAM), and secondary storage. Faster, more expensive memory is closer to the CPU, while larger, slower memory is farther away.' },
        { question: 'What is pipelining in computer architecture?', answer: 'Pipelining is a technique used in CPUs to increase instruction throughput by overlapping the execution of multiple instructions. In a pipeline, different stages of multiple instructions are processed in parallel, allowing more efficient utilization of the CPU and reducing the overall execution time.' },
        { question: 'What is cache memory?', answer: 'Cache memory is a small, high-speed memory located close to the CPU, used to temporarily store frequently accessed data and instructions. By reducing the time it takes to access data from the main memory, cache memory significantly speeds up the performance of the system.' },
        { question: 'What is the function of a control unit?', answer: 'The control unit in a CPU orchestrates the execution of instructions by interpreting them and generating control signals. These signals guide the movement of data within the CPU and direct the ALU, memory, and input/output devices to perform specific operations in sequence.' },
    ],
    5: [
        { question: 'What is an operating system?', answer: 'An operating system (OS) is a system software that manages computer hardware and software resources, providing a platform for other software to run. It handles tasks such as process management, memory management, file systems, and device management, serving as an interface between users and the hardware.' },
        { question: 'What is a process in OS?', answer: 'A process in an operating system is an instance of a program in execution. It includes the program code, data, and resources like CPU time and memory allocated by the OS. Processes can be in various states, such as running, waiting, or terminated, depending on their current execution status.' },
        { question: 'What is a thread?', answer: 'A thread is the smallest unit of execution within a process. Threads allow a program to perform multiple tasks concurrently within the same process, sharing the same memory space but operating independently. Multithreading is commonly used to improve the performance of applications.' },
        { question: 'What is multitasking?', answer: 'Multitasking is the capability of an operating system to execute multiple processes or tasks simultaneously by sharing CPU resources. The OS allocates time slices to each task, switching between them quickly enough to give the illusion of parallelism.' },
        { question: 'What is virtual memory?', answer: 'Virtual memory is a memory management technique where the operating system uses a portion of the hard drive as an extension of RAM. This allows a computer to run larger applications or multiple applications simultaneously, even if there is not enough physical RAM available.' },
        { question: 'What is a file system?', answer: 'A file system is a method used by an operating system to organize, store, and manage data on storage devices like hard drives. It defines how files are named, stored, and retrieved, and includes features like directories, permissions, and file indexing to facilitate efficient data management.' },
        { question: 'What is process scheduling?', answer: 'Process scheduling is the activity performed by an OS to allocate CPU time to processes. Scheduling ensures that processes are executed in an efficient manner by prioritizing tasks and switching between them based on algorithms like First-Come-First-Served (FCFS), Shortest Job Next (SJN), or Round Robin.' },
        { question: 'What is deadlock?', answer: 'A deadlock occurs when two or more processes are unable to proceed because each is waiting for the other to release resources. Deadlocks can occur in multitasking systems when processes acquire locks on resources in a circular dependency, preventing any process from completing its task.' },
        { question: 'What is paging in OS?', answer: 'Paging is a memory management scheme where a computer’s memory is divided into small, fixed-sized blocks called pages. These pages are loaded into memory as needed, allowing efficient use of physical memory and avoiding fragmentation issues. Pages can be swapped in and out of virtual memory as required.' },
        { question: 'What is kernel in OS?', answer: 'The kernel is the core part of an operating system that directly interacts with the hardware. It manages system resources such as CPU, memory, and I/O devices, and handles tasks like process management, memory management, and interrupt handling. The kernel ensures that system operations are performed securely and efficiently.' },
    ]
};

function loadQuestions() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const faqContent = document.getElementById('faqContent');
    faqContent.innerHTML = '';

    if (selectedCategory && questions[selectedCategory]) {
        questions[selectedCategory].forEach(q => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.textContent = q.question;

            const iconElement = document.createElement('span');
            iconElement.classList.add('material-icons');
            iconElement.textContent = 'more_vert'; // Adding the icon
            
            questionElement.appendChild(iconElement);
            questionElement.onclick = () => toggleAnswer(questionElement, q.answer);
            
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            questionElement.appendChild(answerElement);

            faqContent.appendChild(questionElement);
        });
    }
}

function toggleAnswer(questionElement, answerText) {
    const answerElement = questionElement.querySelector('.answer');
    if (answerElement.style.display === 'none' || !answerElement.style.display) {
        answerElement.style.display = 'block';
        answerElement.textContent = answerText;
        answerElement.classList.add('collapse');
        questionElement.classList.add('active'); // Adding the active class for color change
    } else {
        answerElement.style.display = 'none';
        answerElement.classList.remove('collapse');
        questionElement.classList.remove('active'); // Removing the active class when collapsed
    }
}
