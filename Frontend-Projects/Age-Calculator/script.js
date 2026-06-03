const { DateTime } = luxon

// 1. Initialize a variable to store the selected date reference
let selectedJSDate = null

const picker = datepicker('#my-input', {
  onSelect(instance, date) {
    // Save the raw JS Date object when the user picks a date
    selectedJSDate = date
  }
})

// 2. Intercept the form submission
document.getElementById('age-form').addEventListener('submit', function(event) {
  // Prevent the page from refreshing on form submit
  event.preventDefault()

  const resultContainer = document.getElementById('result')

  // Safety check: Ensure the user actually picked a date from the calendar
  if (!selectedJSDate) {
    resultContainer.textContent = 'Please select a date from the calendar first.'
    return
  }

  // 3. Process the calculation exactly as before
  const chosenDateOfBirth = DateTime.fromJSDate(selectedJSDate).startOf('day')
  const now = DateTime.now().startOf('day')

  if (chosenDateOfBirth > now) {
    resultContainer.textContent = 'Please select a date in the past.'
    return
  }

  const diff = now.diff(chosenDateOfBirth, ['years', 'months', 'days']).toObject()
  
  const years = Math.floor(diff.years)
  const months = Math.floor(diff.months)
  const days = Math.floor(diff.days)

  if (years === 0 && months === 0 && days === 0) {
    resultContainer.textContent = 'Welcome to the world! You were born today! 🎉'
    return
  }

  resultContainer.textContent =
    `You are ${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${days !== 1 ? 's' : ''} old.`
})
