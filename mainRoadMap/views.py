from django.shortcuts import render

def RoadMapView(request):
    return render(request, 'mainRoadMap/roadmapPage.html')