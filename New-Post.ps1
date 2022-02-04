# Code by Francisco Santana (https://franciscosp.com).
# This file is meant to add a new post by creating a properly-formatted markdown file (with metadata).
# You are free to copy this code, so long as proper attribution is provided.

param(
	[Parameter(Mandatory = $true)]
	[String] $Title,

	[Parameter(Mandatory = $false)]
	[String] $Author = "Francisco Santana",

	[Parameter(Mandatory = $false)]
	[Switch] $Wide,

	[Parameter(Mandatory = $false)]
	[Switch] $DoComments,

	[Parameter(Mandatory = $false)]
	[Switch] $DoTOC,

	[Parameter(Mandatory = $false)]
	[String] $HeaderImage = $null,

	[Parameter(Mandatory = $false)]
	[Switch] $OverlayHeaderImage,

	[Parameter(Mandatory = $false)]
	[String] $Excerpt = $null,

	[Parameter(Mandatory = $true)]
	[AllowNull()]
	[AllowEmptyString()]
	[String] $Location = $null
)

if ($null -eq $Location -or '' -eq $Location) { $Location = "_posts" }

$time = (Get-Date -Format "hh-mm-ss K").replace(":", "").replace("-", ":")
$date = Get-Date -Format "yyyy-MM-dd"

$content = "---`ntitle: $Title`ndate: $date $time"
if ($Excerpt -ne $null) { $content = $content + "`nexcerpt: $Excerpt # Add an excerpt here!`n" }
else { $content = $content + "`n#excerpt: $Excerpt # Add an excerpt here!`n" }

$content = $content + "`ncategories: # Add categories here!"

$content = $content + "`ntags: # Add tags here!"

$content = $content + "`n`nauthor: $Author`n"

if ($Wide) { $content = $content + "`nclasses: wide" }

if ($DoComments) { $content = $content + "`ncomments: true # Set this to 'false' to disable comments!" }

if ($DoTOC) { $content = $content + "`ntoc: true # Set this to 'false' to disable the table of contents. `ntoc_label: ""$Title"" # Set the title of the table of contents here!`ntoc_icon: ""cog""" }

$content = $content + "`nslug: $($Title.replace(" ","-"))"

if (($HeaderImage -ne $null) -or ($OverlayHeaderImage -ne $null)) {
	$content = $content + "`nheader:"
	if ($HeaderImage -ne $null) {
		if ($OverlayHeaderImage) { $content = $content + "`n#  overlay_image: $HeaderImage # Set the header image here!" }
		else { $content = $content + "`n#  image: $HeaderImage # Set the header image here!" }
	}
	else {
		$content = $content + "`n#  image: # Set the header image here!"
	}
	$content = $content + "`n# caption: # Put a caption here. It could be an attribution!"
	$content = $content + "`n# actions: # Put some actions here, such as a button."
}

$content = $content + "`n`n# Add content below the line!`n---"

$file = "./$Location/$date-" + $Title.replace(" ", "-") + ".md"

New-Item -Path $file
Add-Content -Path $file -Value $content

Write-Host "Successfully created a new blog post in $file.`n`tOpen it and modify its contents!"