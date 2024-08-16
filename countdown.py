import time

def countdown(minutes):
    for i in range(minutes, 0, -1):
        print(f"Time remaining: {i} minutes")
        time.sleep(60)

if __name__ == "__main__":
    countdown(360)
  
