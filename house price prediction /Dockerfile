# Base image for Node.js + Python
FROM node:18

# Install Python, pip, and venv
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv

# Set working directory
WORKDIR /app

# Copy Node.js dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Set up virtual environment and install Python dependencies
RUN python3 -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt

# Set PATH to virtualenv
ENV PATH="/opt/venv/bin:$PATH"

# Expose backend port
EXPOSE 3000

# Run server
CMD ["node", "server.js"]
