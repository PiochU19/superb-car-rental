from datetime import timedelta, date


def table_based_on_two_dates(date1, date2):
	"""
	function returning table
	with all dates between 
	dates given
	"""
	dates = []

	delta = date2 - date1

	for i in range(delta.days + 1):
		day = date1 + timedelta(days = i)
		dates.append(str(day))

	return dates


def finding_collision(arr1, arr2):
	"""
	function compares two tables
	and return true if dates don't match
	"""
	if len(arr1) > len(arr2):
		arr1, arr2 = arr2, arr1

	for i in range(len(arr1)):
		if arr1[i] in arr2:
			return False
	return True


def create_table(arr):
	"""
	Create table of rent dates
	"""
	days = []

	for date in arr:
		date1 = date[0]
		date2 = date[1]
		tab = table_based_on_two_dates(date1, date2)

		for i in tab:
			if i not in days:
				days.append(i)
	return days


def parse_date(str):
	"""
	parsing given str
	to date 
	"""
	ymd = str.split('-')
	return date(int(ymd[0]), int(ymd[1]), int(ymd[2]))